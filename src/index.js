import 'bootstrap/dist/css/bootstrap.min.css';
import Compressor from "compressorjs";

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

    createTableHeader() {
        // thead
        const thead = document.createElement('thead');
        thead.classList.add('thead-dark');

        // tr: table row
        const tr = document.createElement('tr');

        //th: table header
        const th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.innerHTML = 'Image';
        tr.appendChild(th);

        //th2: table header
        const th2 = document.createElement('th');
        th2.setAttribute('scope', 'col');
        th2.innerHTML = 'File type';
        tr.appendChild(th2);


        //th3: table header
        const th3 = document.createElement('th');
        th3.setAttribute('scope', 'col');
        th3.innerHTML = 'Size';
        tr.appendChild(th3);

        //th4: table header
        const th4 = document.createElement('th');
        th4.setAttribute('scope', 'col');
        th4.innerHTML = 'Compressed size';
        tr.appendChild(th4);

        //th5: table header
        const th5 = document.createElement('th');
        th5.setAttribute('scope', 'col');
        th5.innerHTML = 'Download';
        tr.appendChild(th5);

        thead.appendChild(tr);

        return thead;
    }

    async handleFiles(files) {
        const table = document.createElement('table');
        table.classList.add('table')
        table.classList.add('table-hover')

        const thead = this.createTableHeader();
        const tbody = document.createElement('tbody');


        [...files].forEach((file) => {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const src = e.target.result;
                const row = document.createElement('tr');

                const td1 = document.createElement('td');
                const img = document.createElement("img");
                img.src = src;
                img.classList.add('img-thumbnail');
                img.width = 100;
                td1.appendChild(img);
                row.appendChild(td1);

                const td2 = document.createElement('td');
                td2.innerHTML = file.type;
                row.appendChild(td2);

                const td3 = document.createElement('td');
                const i = file.size == 0 ? 0 : Math.floor(Math.log(file.size) / Math.log(1024));
                td3.innerHTML = (file.size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
                row.appendChild(td3);

                const td4 = document.createElement('td');
                td4.innerHTML = "Loading...";
                row.appendChild(td4);

                const td5 = document.createElement('td');
                row.appendChild(td5);

                await new Compressor(file, {
                    quality: 0.8,
                    maxWidth: 800,
                    success(result) {
                        const i = result.size == 0 ? 0 : Math.floor(Math.log(result.size) / Math.log(1024));

                        td4.innerHTML = (result.size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
                        row.appendChild(td4);

                        const imageURL = URL.createObjectURL(result)

                        td5.innerHTML = '<a href="' + imageURL + '" download="' + result.name + '" class="btn btn-primary">Download</a>';
                        row.appendChild(td5);
                    },
                    error(err) {
                        console.log(err.message);
                    },
                });

                tbody.appendChild(row);
            }

            reader.readAsDataURL(file);
        })

        table.appendChild(thead);
        table.appendChild(tbody);

        document.querySelector(".table-responsive").appendChild(table);
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
