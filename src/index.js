import Compressor from "compressorjs";
import './styles.scss';

export default class DropImages {
    constructor() {
        this.dropZone = document.querySelector('#dropzone')
    }

    preventDefaults(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    highlight() {
        this.dropZone.classList.remove('bg-body-tertiary')
        this.dropZone.classList.add('bg-body-secondary')
    }

    unhighlight() {
        this.dropZone.classList.remove('bg-body-secondary')
        this.dropZone.classList.add('bg-body-tertiary')
    }

    async handleFiles(files) {
        [...files].forEach((file) => {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const src = e.target.result;

                await new Compressor(file, {
                    quality: 0.8,
                    maxWidth: 800,
                    success(result) {
                        const imageURL = URL.createObjectURL(result)

                        dropImages.appendRow({
                            src,
                            name: result.name,
                            originalSize: file.size,
                            compressedSize: result.size,
                            imageURL
                        });
                    },
                    error(err) {
                        console.log(err.message);
                    },
                });
            }

            reader.readAsDataURL(file);
        })
    }

    byteConverter(bytes, decimals) {
        const K_UNIT = 1024;
        const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

        if (bytes === 0) return "0 Byte";

        let i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));

        return  parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) + " " + SIZES[i];
    }


    async appendRow({src, name, originalSize, compressedSize, imageURL}) {
        const table = document.querySelector('table.table');
        table.classList.remove('d-none');
        const tbody = document.querySelector('tbody#table-body');
        const row = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.classList.add('align-middle')
        const img = document.createElement("img");
        img.src = src;
        img.classList.add('img-thumbnail');
        img.width = 100;
        td1.appendChild(img);
        row.appendChild(td1);

        const td2 = document.createElement('td');
        td2.innerHTML = this.byteConverter(originalSize, 2) ?? "Loading...";
        td2.classList.add('align-middle')
        row.appendChild(td2);

        const td3 = document.createElement('td');
        td3.innerHTML = this.byteConverter(compressedSize, 2) ?? "Loading...";
        td3.classList.add('align-middle')
        row.appendChild(td3);

        const td4 = document.createElement('td');
        td4.innerHTML = `${Math.floor(100 - (compressedSize * 100 / originalSize))}%`;
        td4.classList.add('align-middle')
        row.appendChild(td4);

        const td5 = document.createElement('td');
        td5.classList.add('align-middle')
        td5.innerHTML = '<a href="' + imageURL + '" download="' + "image" + '" class="btn btn-primary">Download</a>';
        row.appendChild(td5);

        tbody.appendChild(row);
    }

    async handleDrop(e) {
        let dt = e.dataTransfer
        let files = dt.files

        await this.handleFiles(files)
    }


    addEventListeners() {
        ['dragenter', 'dragover'].forEach((eventName) => {
            this.dropZone.addEventListener(
                eventName,
                (e) => {
                    this.preventDefaults(e);
                    this.highlight()
                },
                false
            )
        });

        ['dragleave', 'drop'].forEach(eventName => {
            this.dropZone.addEventListener(
                eventName,
                (e) => {
                    this.preventDefaults(e)
                    this.unhighlight()
                },
                false
            )
        })

        this.dropZone.addEventListener(
            'drop', (e) => {
                this.preventDefaults(e)
                this.handleDrop(e)
            },
            false
        )
    }

    init() {
        console.log('DropImages.init()');
        this.addEventListeners();
    }
}

const dropImages = new DropImages();
dropImages.init();
