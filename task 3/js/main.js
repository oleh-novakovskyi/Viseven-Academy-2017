window.onload = function(){

    App.run();

}


let App = {

    modal_window:null,
    plus_item:null,
    current_image:null,
    current_msg_count:null,
    current_like_count:null,
    current_dislike_count:null,

    run:function() {

        this.plus_item = document.getElementById("add-plus");

        let add_new = document.getElementById("plus");

        add_new.onclick = function(){
            App.addNewItem();
        }

        let items_wrapper = document.getElementById("items");

        items_wrapper.onclick = function(e){

            if( e.target.tagName == "IMG") {

                App.current_image = e.target;                
                App.modalWindowShow();
            }

        }

        let close_modal = document.getElementById("close-modal");

        close_modal.onclick = function() {

            App.modalWindowHide();
        }

        this.modal_window = document.getElementById('myModal')

        let add_msg_button = document.getElementById("add-msg");

        add_msg_button.onclick = function() {

            App.addNewMsg();
        }
		
		let add_like_button = document.getElementById("l-btn");

        add_like_button.onclick = function() {

            App.addNewLike();

        }
		
		let add_dislike_button = document.getElementById("d-btn");

        add_dislike_button.onclick = function() {

            App.addNewDislike();

        }


    },

    addNewItem:function() {

            let image_number = Math.floor(Math.random()*8) + 1;

            var new_figure = document.getElementById("figure-template").cloneNode( true );

            new_figure.removeAttribute("id");

            var img_tag = new_figure.getElementsByTagName("img")[0];

            img_tag.setAttribute( "src", "img/"+image_number+".jpg" );

            document.getElementById("items").insertBefore( new_figure, this.plus_item );
			
			var elmnt = document.getElementById("items");
		elmnt.scrollLeft += 500;
		elmnt.scrollTop += 0;
		
		

    },

    modalWindowShow:function() {

        if( this.modal_window.style.display != "block" ) {

            let comments = null;

            let collection_item = this.current_image.parentElement;

            for ( var i = 0; i < collection_item.childNodes.length; i++ ) {

                if ( collection_item.childNodes[i].className == "storage") {

                    comments = collection_item.childNodes[i].innerHTML;                    
					
                    break;
					
                }				
            }

						
			this.current_msg_count = collection_item.getElementsByClassName("comm badge")[0].getAttribute('data-badge'); // get current count of msgs for collection item			
            this.current_like_count = collection_item.getElementsByClassName("like badge")[0].getAttribute('data-badge'); // get current count of likes for collection item
            this.current_dislike_count = collection_item.getElementsByClassName("dislike badge")[0].getAttribute('data-badge'); // get current count of dislikes for collection item 

            document.getElementById("d-btn").getElementsByClassName("badge")[0].setAttribute( "data-badge", this.current_dislike_count );			
			document.getElementById("l-btn").getElementsByClassName("badge")[0].setAttribute( "data-badge", this.current_like_count );
            document.getElementById("myModal").getElementsByTagName("img")[0].setAttribute( "src", this.current_image.getAttribute('src') );

			document.getElementById('modal-msg-list').innerHTML = comments;

            this.modal_window.style.display = "block";
			
        }

    },

    modalWindowHide:function() {

        this.modal_window.style.display = "none";

        let comments = document.getElementById('modal-msg-list').innerHTML;

        document.getElementById('modal-msg-list').innerHTML = '';

        let collection_item = this.current_image.parentElement;

        for ( var i = 0; i < collection_item.childNodes.length; i++ ) {

            if ( collection_item.childNodes[i].className == "storage") {
                collection_item.childNodes[i].innerHTML = comments;
                break;
            }
        }

        collection_item.getElementsByClassName("comm badge")[0].setAttribute( "data-badge", this.current_msg_count ); // set new count of msgs for collection item
        collection_item.getElementsByClassName("like badge")[0].setAttribute( "data-badge", this.current_like_count ); // set new count of msgs for collection item
        collection_item.getElementsByClassName("dislike badge")[0].setAttribute( "data-badge", this.current_dislike_count ); // set new count of msgs for collection item
        
    },

    addNewMsg:function() {

        let doc = document,
        msgName, msgDesc, html;

        if (doc.getElementById('name').value) {
			
            msgName = doc.getElementById('name').value;
			
        } else {
			
            doc.getElementById('name').focus();
			
            return;
        }

        if (doc.getElementById('desc').value) {
			
            msgDesc = doc.getElementById('desc').value;
			
        } else {
			
            doc.getElementById('desc').focus();
			
            return;
        }

        let msgDateStart = new Date(),
            dd = msgDateStart.getDate(),
            mm = msgDateStart.getMonth()+1,
            yyyy = msgDateStart.getFullYear();
		
        if(dd<10){
            dd='0'+dd
        }
		
        if(mm<10){
            mm='0'+mm
        }
		
        let msgDateFin = dd+'/'+mm+'/'+yyyy;        

        html = '<section class="msg"><div><span>By ' + msgName + '</span><span>' + msgDateFin + '</span></div> <p>' + msgDesc + '</p></section>';
		

        if ( doc.getElementById('modal-msg-list').innerHTML += html ) {

            doc.forms.myform.reset();
            this.current_msg_count++;

        }

    },
	
	addNewLike:function() {
				
        this.current_like_count++;
        document.getElementById("l-btn").getElementsByClassName("badge")[0].setAttribute( "data-badge", this.current_like_count );

    },
	
	addNewDislike:function() {

        this.current_dislike_count++;
        document.getElementById("d-btn").getElementsByClassName("badge")[0].setAttribute( "data-badge", this.current_dislike_count );

    }

}
