import Compressor from "compressorjs";
import {downloadZip} from "client-zip";

export default class DropImages {
    constructor(
        dropZone = document.querySelector('#dropzone'),
        downloadAllButtonWrapper = document.querySelector('div#download-all-wrapper'),
        table = document.querySelector('table.table'),
        tbody = document.querySelector('tbody#table-body')
    ) {
        this.dropZone = dropZone;
        this.downloadAllButtonWrapper = downloadAllButtonWrapper;
        this.table = table;
        this.tbody = tbody;
    }

    reset() {
        // Hide download all button
        if (this.downloadAllButtonWrapper !== null) {
            this.downloadAllButtonWrapper.innerHTML = '';
        }

        // Hide table
        if (this.table !== null) {
            this.table.classList.add('d-none');
        }

        // Remove all rows from the table
        if (this.tbody !== null) {
            this.tbody.innerHTML = '';
        }
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    highlight() {
        if (this.dropZone === null) return;

        this.dropZone.classList.remove('bg-body-tertiary');
        this.dropZone.classList.add('bg-body-secondary');
    }

    unhighlight() {
        if (this.dropZone === null) return;

        this.dropZone.classList.remove('bg-body-secondary');
        this.dropZone.classList.add('bg-body-tertiary');
    }

    handleFiles(files) {
        // Reset the UI
        this.reset();

        const promises = [...files].map((file) => {
            return new Promise(async (resolve, reject) => {
                await new Compressor(file, {
                    quality: 0.8,
                    maxWidth: 1200,
                    maxHeight: 1200,
                    success: resolve,
                    error: reject,
                });
            }).then(async (result) => {
                const reader = new FileReader();

                reader.onload = async () => {
                    const imageURL = reader.result;
                    const originalSize = file.size;
                    const compressedSize = result.size;

                    await this.appendRow({originalSize, compressedSize, imageURL});
                }

                reader.readAsDataURL(result);

                return result;
            }).catch((err) => {
                console.log('Compress error', err);
            });
        });

        Promise.all(promises).then(async (values) => {
            await this.createBatchDownload(values);
        }).then(async () => {
            if (this.table === null) return;

            this.table.classList.remove('d-none');
        });
    }

    byteConverter(bytes, decimals) {
        const K_UNIT = 1024;
        const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

        if (bytes === 0) return "0 Byte";

        let i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));

        return parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) + " " + SIZES[i];
    }

    appendRow({originalSize, compressedSize, imageURL}) {
        if (this.tbody === null) return;

        const table = document.querySelector('table.table');
        table.classList.remove('d-none');
        const row = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.classList.add('align-middle');
        const img = document.createElement("img");
        img.src = imageURL;
        img.classList.add('img-thumbnail');
        img.width = 100;
        td1.appendChild(img);
        row.appendChild(td1);

        const td2 = document.createElement('td');
        td2.innerHTML = this.byteConverter(originalSize, 2) ?? "Loading...";
        td2.classList.add('align-middle');
        row.appendChild(td2);

        const td3 = document.createElement('td');
        td3.innerHTML = this.byteConverter(compressedSize, 2) ?? "Loading...";
        td3.classList.add('align-middle');
        row.appendChild(td3);

        const td4 = document.createElement('td');
        td4.innerHTML = `${Math.floor(100 - (compressedSize * 100 / originalSize))}%`;
        td4.classList.add('align-middle');
        row.appendChild(td4);

        const td5 = document.createElement('td');
        td5.classList.add('align-middle');
        td5.innerHTML = '<a href="' + imageURL + '" download="' + "image" + '" class="btn btn-primary">Download</a>';
        row.appendChild(td5);

        this.tbody.appendChild(row);
    }

    handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;

        this.handleFiles(files);
    }

    async createBatchDownload(files) {
        const hydratedFiles = [...files].map((file) => {
            return new File([file], file.name, {type: file.type})
        })

        const blob = await downloadZip(hydratedFiles).blob();

        const downloadAllButton = document.createElement('a');

        downloadAllButton.href = URL.createObjectURL(blob);
        downloadAllButton.download = "images.zip";
        downloadAllButton.innerHTML = "Download All";
        downloadAllButton.classList.add("btn", "btn-primary", "mt-3");

        this.downloadAllButtonWrapper.appendChild(downloadAllButton);
    }

    addEventListeners() {
        if (this.dropZone === null) return;

        ['dragenter', 'dragover'].forEach((eventName) => {
            if (this.dropZone === null) return;

            this.dropZone.addEventListener(
                eventName,
                (e) => {
                    this.preventDefaults(e);
                    this.highlight();
                },
                false
            );
        });

        ['dragleave', 'drop'].forEach(eventName => {
            if (this.dropZone === null) return;

            this.dropZone.addEventListener(
                eventName,
                (e) => {
                    this.preventDefaults(e);
                    this.unhighlight();
                },
                false
            );
        });

        this.dropZone.addEventListener(
            'drop', async (e) => {
                this.preventDefaults(e);

                await this.handleDrop(e);
            },
            false
        );
    }

    init() {
        // Reset the UI
        this.reset();

        // Add event listeners
        this.addEventListeners();
    }
}

window.DropImages = DropImages;
