class DataTable {

    constructor(selector, options = {}) {
        
        this.table = document.querySelector(selector);
        this.columns = options.columns || [];

        this.tableHeader = options.tableHeader ? document.querySelector(options.tableHeader) : null;
        this.tableFooter = options.tableFooter ? document.querySelector(options.tableFooter) : null;

        this.dataSource = options.data;
        this.rows = [];
        this.total = 0;
        this.perPage = options.perPage || 10;
        this.currentPage = 1;
        this.q = "";

        this.enablePaginate = "enablePaginate" in options ? options.enablePaginate : true;
        this.enableSearch = "enableSearch" in options ? options.enableSearch : true;
        this.enablePerPageSelector = "enablePerPageSelector" in options ? options.enablePerPageSelector : true;





        this.loadData();
        this.injectStyles();
        this.renderHeader();
    }

    async loadData() {
        if (typeof this.dataSource === "function") {
            const { rows, total } = await this.dataSource({
                page: this.currentPage,
                per_page: this.perPage,
                q: this.q
            });
            this.rows = rows;
            this.total = total ?? rows.length;
        } else {
            this.rows = this.dataSource || [];
            this.total = this.rows.length;
        }
        this.render();
    }

    render() {
        if (!this.table) return;


        this.table.innerHTML = `
            <thead>
                <tr>
                    ${this.columns.map(col => `<th>${col.label}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${this.rows.map(row => `
                <tr>
                    ${this.columns.map(col => {
                        if (typeof col.render === "function") {
                            return `<td>${col.render(row)}</td>`;
                        }
                        return `<td>${row[col.key] ?? ""}</td>`;
                    }).join('')}
                </tr>
                `).join('')}
            </tbody>
        `;


        

        if (this.enablePaginate) {
            this.renderFooter();
        }

        
    }

    renderHeader() {

        this.tableHeader.innerHTML = `
            <div style="display: flex; justify-content: space-between">
                    <div>
                        ${ this.enablePerPageSelector ?
                        `<div class="" style="background-color: white; padding: 5px; border-radius: 4px;">
                            <lable>Showing </lable>
                            <select class="d-per-page" id="per_page">
                                <option value="1">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <lable> rows</lable>
                        </div>` : ``
                        }
                    </div>

                    <div>
                        ${ this.enableSearch ?
                        `

                            <div class="d-search-field" style="width: 400px; display:flex; gap:5px;">
                                <input type="text" id="datatable_search" class="form-control" placeholder="Search">
                                <div class="d-input-group-btn">
                                    <button class="d-btn d-btn-default" id="datatable_search_btn" type="button" style="display:flex; align-items:center; justify-content:center; gap:4px;">
                                        <!-- SVG search icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.104a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        ` :  ``
                        }
                    </div>
            </div>
        `;


        const searchInput = document.querySelector("#datatable_search");
        const searchBtn = document.querySelector("#datatable_search_btn");

        if (searchInput) {
            
            let typingTimer;
            searchInput.addEventListener("keyup", (e) => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => {
                    this.q = e.target.value;
                    this.currentPage = 1; 
                    this.loadData();
                }, 500); 
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener("click", () => {
                this.q = searchInput.value;
                this.currentPage = 1;
                this.loadData();
            });
        }

        const perPageSelect = document.querySelector("#per_page");
        if (perPageSelect) {
            perPageSelect.addEventListener("change", (e) => {
                this.perPage = parseInt(e.target.value);
                this.currentPage = 1;
                this.loadData();
            });
        }

        

    }

    renderFooter() {
        const totalPages = Math.ceil(this.total / this.perPage);

           
            let pageButtons = "";

            
            if (totalPages > 1) {
                pageButtons += `<button class="d-paginate-btn ${this.currentPage === 1 ? 'd-paginate-active' : ''}" data-page="1">1</button>`;
            }

            
            if (this.currentPage > 3) {
                pageButtons += `<span class="d-paginate-dots">...</span>`;
            }

            
            for (let i = Math.max(2, this.currentPage - 1); i <= Math.min(totalPages - 1, this.currentPage + 1); i++) {
                pageButtons += `<button class="d-paginate-btn ${this.currentPage === i ? 'd-paginate-active' : ''}" data-page="${i}">${i}</button>`;
            }

            
            if (this.currentPage < totalPages - 2) {
                pageButtons += `<span class="d-paginate-dots">...</span>`;
            }

            
            if (totalPages > 1) {
                pageButtons += `<button class="d-paginate-btn ${this.currentPage === totalPages ? 'd-paginate-active' : ''}" data-page="${totalPages}">${totalPages}</button>`;
            }

            

            
            this.tableFooter.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items:center;">
                    <div class="d-paginate-text">
                        Showing ${this.perPage * (this.currentPage - 1) + 1} 
                        to ${Math.min(this.perPage * this.currentPage, this.total)} 
                        of ${this.total} entries
                    </div>
                    <div class="d-paginate-container" style="display:flex; gap:6px;">
                        <button class="d-paginate-btn ${this.currentPage === 1 ? 'd-paginate-disabled' : ''}" data-page="${this.currentPage -1}">Previous</button>
                        ${pageButtons}
                        <button class="d-paginate-btn ${this.currentPage === totalPages ? 'd-paginate-disabled' : ''}" data-page="${this.currentPage +1}">Next</button>
                    </div>
                </div>
            `;

        // Add event listeners
        this.tableFooter.querySelectorAll(".d-paginate-btn").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const page = parseInt(e.target.dataset.page);
                if (page > 0) {
                    this.currentPage = page;
                    await this.loadData();
                }
            });
        });
    }

    injectStyles() {
        if (document.getElementById("datatable-styles")) return; 

        const css = `
        .d-table {
            width: 100%;
            border-collapse: collapse;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            background-color: #fff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.05);
            border-radius: 6px;
            overflow: hidden;
        }
        .d-table th, .d-table td {
            padding: 10px 12px;
            border: 1px solid #e5e5e5;
            text-align: center;
            vertical-align: middle;
        }
        .d-table thead {
            background-color: #f9fafb;
            font-weight: bold;
            color: #333;
        }
        .d-search-fild {
            display: flex;
            border: 1px solid #ddd;
            border-radius: 4px;
            overflow: hidden;
            background: #fff;
        }
        .d-search-fild input {
            border: none;
            flex: 1;
            padding: 6px 10px;
            font-size: 14px;
            outline: none;
        }
        .d-input-group-btn button {
            background-color: #007bff;
            border: none;
            color: #fff;
            padding: 6px 12px;
            cursor: pointer;
            transition: background 0.2s ease;
        }
        .d-input-group-btn button:hover {
            background-color: #0056b3;
        }
        .d-per-page {
            padding: 5px 8px;
            font-size: 13px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: #fff;
            cursor: pointer;
        }
        .d-paginate-container {
            display: flex;
            gap: 5px;
        }
        .d-paginate-btn {
            border: 1px solid #ddd;
            background: #fff;
            padding: 5px 12px;
            font-size: 13px;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.2s ease;
        }
        .d-paginate-btn:hover {
            background: #f5f5f5;
        }
        .d-paginate-active {
            background: #007bff;
            color: #fff;
            border-color: #007bff;
            font-weight: bold;
        }
        .d-paginate-disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        .d-paginate-text {
            font-size: 13px;
            color: #666;
            margin-top: 6px;
        }
        .d-paginate-dots {
            padding: 6px 10px;
            color: #999;
            font-size: 13px;
            user-select: none;
        }
        `;

        const style = document.createElement("style");
        style.id = "datatable-styles";
        style.innerHTML = css;
        document.head.appendChild(style);
    }

}

export { DataTable as default };
