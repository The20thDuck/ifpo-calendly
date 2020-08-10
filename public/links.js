let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const arr = JSON.parse(this.responseText);
        const container = document.getElementById("container")
        arr.forEach(element => {
            const div = document.createElement('div');
            div.setAttribute("class", "gridItem");
            
            const title = document.createElement('h2');
            title.innerText = `${element.name}`
            const info = document.createElement('p');
            info.innerText = `${element.duration_minutes} min, ${element.kind_description}`;
            info.setAttribute("class", "orange");
            
            const linkGen = document.createElement('div');
    
            const textLabel = document.createElement('label');
            textLabel.setAttribute('for', `number${element.id}`)
            textLabel.innerText = "Number of Links: "

            const number = document.createElement('input');
            number.setAttribute('type', 'text')
            number.setAttribute('name', `number${element.id}`)
            number.setAttribute('class', `number`)

            const button = document.createElement('button');
            const spinner = document.createElement('i');
            button.appendChild(spinner);
            const span = document.createElement('span');
            span.innerText="Generate"
            button.appendChild(span);

            button.setAttribute('id', `button${element.id}`);
            // button.innerText = 'Generate';
            button.onclick = () => {
                spinner.setAttribute('class', 'fa fa-spinner fa-spin');
                // alert(number.value);
                let linkXhttp = new XMLHttpRequest();
                linkXhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        links = JSON.parse(this.responseText);
                        let csvContent = "data:text/csv;charset=utf-8,"+links.join('\n');
                        let encodedUri = encodeURI(csvContent);
                        var download = document.createElement("a");
                        download.setAttribute("href", encodedUri);
                        download.setAttribute("download", "calendly-links.csv");
                        document.body.appendChild(download); // Required for FF
                        
                        download.click();
                        spinner.setAttribute('class', '');
                    }
                    else if (this.readyState == 4) {
                        spinner.setAttribute('class', '');
                    }
                };
                body = {
                    action: "genLinks",
                    number: parseInt(number.value),
                    event_id: element.id
                };
                
                linkXhttp.open("POST", "requests");
                linkXhttp.setRequestHeader("Content-Type", "application/json");
                linkXhttp.send(JSON.stringify(body));
            };

            linkGen.appendChild(info);
            linkGen.appendChild(textLabel);
            linkGen.appendChild(number);
            linkGen.appendChild(button);
            
            div.appendChild(title);
            div.appendChild(linkGen);
            container.appendChild(div)
        })
    }
};
body = {
    action: "getEvents"
};

xhttp.open("POST", "requests");
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.send(JSON.stringify(body));