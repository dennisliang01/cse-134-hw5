
class RatingWidget extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });


        
        let heading = document.createElement("h3");
        heading.setAttribute("id", "heading");
        let ratingBox = document.createElement("div");
        ratingBox.id = "rating-box";

        heading.innerText = "Rating Widget";
    
        this.shadowRoot.appendChild(heading);
        this.shadowRoot.appendChild(ratingBox);
        heading = null;
    }

    connectedCallback() {
        console.log("Connected");
        let styleTag = document.createElement("style");
        // Using back tick, not single quote for multi line assignment
        styleTag.innerHTML = `
                h3 {
                    text-align: center;
                    font-size: 2rem;
                    margin-bottom: 0;
                }

                div {
                    display: flex;
                    justify-content: center;
                    margin: 0;
                    padding: 0;
                }

                span {
                    padding: 1rem;
                    font-size: 2rem;
                    color: #FFD700;
                    cursor: pointer;
                }
            `;
        this.shadowRoot.append(styleTag);

        this.initializeRatingBox();

        this.shadowRoot.addEventListener("mouseover", this.hoverFunction);
        this.shadowRoot.addEventListener("mouseout", this.resetFunction);

        this.shadowRoot.addEventListener("click", this.selectFunction);

    }

    disconnectedCallback() {
        console.log("Disconnected");
    }

    initializeRatingBox() {
        let ratingBox = this.shadowRoot.getElementById("rating-box");

        let starNum = document.getElementById("rating").getAttribute("max");
        console.log(starNum);

        if (starNum > 10) {
            console.log("replacing %d with 10", starNum);
            starNum = 10;

        } else if (starNum < 3) {
            console.log("replacing %d with 3", starNum);
            starNum = 3;
        }
        
        for (let i = 0; i < starNum; i++) {
            let newStar = document.createElement("span");
            newStar.id = "star";
            newStar.setAttribute('star-num', i);
            newStar.innerHTML = "&#9734";
            ratingBox.appendChild(newStar);
        }
    }

    hoverFunction(event) {
        let id = event.target.id;
        if(id == "star") {
            let number = event.target.getAttribute("star-num");
            let star_list = this.querySelectorAll('span');
            for(let i = 0; i < star_list.length; i++) {
                if(i <= number) {
                    star_list[i].innerHTML = "&#9733";
                } else {
                    star_list[i].innerHTML = "&#9734";
                }
            }
        }
    }

    resetFunction(event) {
        let id = event.target.id;
        if(id == "star") {
            let star_list = this.querySelectorAll('span');
            for(let i = 0; i < star_list.length; i++) {
                star_list[i].innerHTML = "&#9734";
            }
        }
    }


    selectFunction(event) {
        console.log("I was clicked");
        let number = event.target.getAttribute("star-num");
        // Accounting for star number offset
        // Need parseInt since number come in a string
        let rating = parseInt(number) + 1;
        console.log("%d rating selected", rating);
        let ratingBox = this.getElementById('rating-box');
        
        let id = event.target.id;
        if(id == "star") {
            let star_list = this.querySelectorAll('span');
            for(let i = 0; i < star_list.length; i++) {
                star_list[i].remove();
            }

            let message = document.createElement("p");
            if (rating >= star_list.length * .8) {
                message.innerText = "Thanks for " +  rating + " star rating!";
            } else {
                message.innerText = "Thanks for your feedback of " +  rating + " star. We'll try to do better!";
            }
            ratingBox.appendChild(message);

            let request = {
                "method": "post"
            }
        }



        
    }

    

}

customElements.define('rating-widget', RatingWidget);
