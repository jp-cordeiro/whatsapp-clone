class WhatsAppController {

    constructor(){
        this.elementsPrototype()
        this.loadElements();
        this.initEvents();
    }

    loadElements(){
        this.el = {};

        document.querySelectorAll('[id]').forEach( element => {
            this.el[Format.getCamelCase(element.id)] = element;
        })
    }

    elementsPrototype(){
        Element.prototype.hide = function(){
            this.style.display = 'none'
            return this
        }

        Element.prototype.show = function(){
            this.style.display = 'block'
            return this
        }

        Element.prototype.toggle = function(){
            this.style.display = (this.style.display === 'none') ? 'block' : 'none'
            return this; 
        }

        Element.prototype.on = function(events, fn){
            events.split(' ').forEach( event => {
                this.addEventListener(event, fn)
            })
            return this
        }

        Element.prototype.css = function(styles){
            for (let name in styles){
                this.style[name] = styles[name]
            }
            return this
        }

        Element.prototype.addClass = function(name){
            this.classList.add(name)
            return this
        }

        Element.prototype.removeClass = function(name){
            this.classList.remove(name)
            return this
        }

        Element.prototype.toggleClass = function(name){
            this.classList.toggle(name)
            return this
        }

        Element.prototype.hasClass = function(name){
            return this.classList.contains(name)
        }

        HTMLFormElement.prototype.getForm = function(){
            return new FormData(this)
        }

        HTMLFormElement.prototype.toJson = function(){
            let json = {}

            this.getForm().forEach( (value, key) => {
                json[key] = value
            })

            return json;
        }
    }

    initEvents(){
        this.el.myPhoto.on('click', e => {
            this.closeAllLeftPanels()
            this.el.panelEditProfile.show()
            setTimeout( _ => this.el.panelEditProfile.addClass('open'), 100)
        })

        this.el.btnClosePanelEditProfile.on('click', e =>{
            this.el.panelEditProfile.removeClass('open')
        })

        this.el.btnNewContact.on('click', e => {
            this.closeAllLeftPanels()
            this.el.panelAddContact.show()
            setTimeout( _ => this.el.panelAddContact.addClass('open'), 100)      
        })

        this.el.btnClosePanelAddContact.on('click', e =>{
            this.el.panelAddContact.removeClass('open')
        })

        this.el.photoContainerEditProfile.on('click', e => {
            this.el.inputProfilePhoto.click()
        })

        this.el.inputNamePanelEditProfile.on('keypress', e => {
            if(e.key === 'Enter'){
                e.preventDefault()

                this.el.btnSavePanelEditProfile.click()
            }
        })

        this.el.btnSavePanelEditProfile.on('click', e => {

        })

        this.el.formPanelAddContact.on('submit', e => {
            e.preventDefault()

            let formData = new FormData(this.el.formPanelAddContact)

        })
    }

    closeAllLeftPanels(){
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }
}