let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const arr = JSON.parse(this.responseText);
        const container = document.getElementById("container")
        arr.forEach(element => {
            const div = document.createElement('div');
            div.setAttribute("class", "gridItem");
            
            const title = document.createElement('h3');
            title.innerText = `${element.name}`
            const info = document.createElement('p');
            info.innerText = `${element.kind_description}`;
            
            const linkGen = document.createElement('div');
    
            const textLabel = document.createElement('label');
            textLabel.setAttribute('for', `number${element.id}`)
            textLabel.innerText = "Number of Links: "

            const number = document.createElement('input');
            number.setAttribute('type', 'text')
            number.setAttribute('name', `number${element.id}`)
            number.setAttribute('class', `number`)

            const button = document.createElement('button');
            button.setAttribute('id', `button${element.id}`);
            button.innerText = 'Generate';
            button.onclick = () => {
                // alert(number.value);
                document.getElementById("loading").innerText = "Loading...";
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
                    }
                    document.getElementById("loading").innerText = "";
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

            linkGen.appendChild(textLabel);
            linkGen.appendChild(number);
            linkGen.appendChild(button);
            
            div.appendChild(title);
            div.appendChild(info);
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