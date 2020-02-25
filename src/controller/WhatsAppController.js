import {CameraController} from "./CameraController";
import {Format} from './../util/Format';
import {ElementsPrototype} from '../util/ElementsPrototype';

export class WhatsAppController {

    constructor(){
        ElementsPrototype.run();
        this.loadElements();
        this.initEvents();
    }

    loadElements(){
        this.el = {};

        document.querySelectorAll('[id]').forEach( element => {
            this.el[Format.getCamelCase(element.id)] = element;
        })
    }

    initEvents(){
        //Profile
        this.el.myPhoto.on('click', e => {
            this.closeAllLeftPanels()
            this.el.panelEditProfile.show()
            setTimeout( _ => this.el.panelEditProfile.addClass('open'), 100)
        })

        this.el.btnClosePanelEditProfile.on('click', e =>{
            this.el.home.hide();
            this.el.panelEditProfile.removeClass('open')
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

         //Left Contacts

         this.el.btnNewContact.on('click', e => {
            this.closeAllLeftPanels()
            this.el.panelAddContact.show()
            setTimeout( _ => this.el.panelAddContact.addClass('open'), 100)
        })

        this.el.btnClosePanelAddContact.on('click', e =>{
            this.el.panelAddContact.removeClass('open')
        })

        this.el.formPanelAddContact.on('submit', e => {
            e.preventDefault()

            let formData = new FormData(this.el.formPanelAddContact)

        })

        //Messages
        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {
            item.on('click', e => {
                this.el.home.hide()
                this.el.main.css({display: 'flex'})
            })
        })

        //Attach

        this.el.btnAttach.on('click', e => {
            e.stopPropagation()
            this.el.menuAttach.addClass('open')

            document.addEventListener('click', this.closeMenuAttach.bind(this))
        })

        //Photo

        this.el.btnAttachPhoto.on('click', e => {
            this.el.inputPhoto.click()
        })

        this.el.inputPhoto.on('change', e => {
            [...this.el.inputPhoto.files].forEach( file => {

            })
        })

        //Camera

        this.el.btnAttachCamera.on('click', e => {
            this.closeAllMainPanel()
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                'height': 'calc(100% - 120px)'
            })

            this._camera = new CameraController(this.el.videoCamera)
        })

        this.el.btnClosePanelCamera.on('click', e =>{
            this.el.panelCamera.removeClass('open')
            this.el.panelMessagesContainer.show()
        })

        this.el.btnTakePicture.on('click' , _ => {
            let dataUrl = this._camera.takePicture()

            this.el.pictureCamera.src = dataUrl
            this.el.pictureCamera.show()
            this.el.videoCamera.hide()
            this.el.btnReshootPanelCamera.show()
            this.el.containerTakePicture.hide()
            this.el.containerSendPicture.show()
        })

        this.el.btnReshootPanelCamera.on('click', e => {
            this.el.pictureCamera.hide()
            this.el.videoCamera.show()
            this.el.btnReshootPanelCamera.hide()
            this.el.containerTakePicture.show()
            this.el.containerSendPicture.hide()
        })

        this.el.btnSendPicture.on('click', e => {
            console.log(this.el.pictureCamera.src)
        })

        //Document

        this.el.btnAttachDocument.on('click', e => {
            this.closeAllMainPanel()
            this.el.panelDocumentPreview.addClass('open')
            this.el.panelDocumentPreview.css({
                'height': 'calc(100% - 120px)'
            })
        })

        this.el.btnClosePanelDocumentPreview.on('click', e => {
            this.el.panelDocumentPreview.removeClass('open')
            this.el.panelMessagesContainer.show()
        })

        this.el.btnSendDocument.on('click', e => {

        })

        this.el.btnAttachContact.on('click', e => {

        })

        //Contact
        this.el.btnAttachContact.on('click', e => {
            this.el.modalContacts.show()
        })

        this.el.btnCloseModalContacts.on('click', e => {
            this.el.panelDocumentPreview.removeClass('open')
            this.el.modalContacts.hide()
        })

        //Microphone
        this.el.btnSendMicrophone.on('click', e => {
            this.el.recordMicrophone.show()
            this.el.btnSendMicrophone.hide()
            this.startRecordMicrophoneTime()
        })

        this.el.btnCancelMicrophone.on('click', e => {
            this.closeRecordMicrophone()
        })

        this.el.btnFinishMicrophone.on('click', e => {
            this.closeRecordMicrophone()
        })

        //Messages
        this.el.inputText.on('keypess', e => {
            if(e.key === 'Enter' && !e.ctrlKey){
                e.preventDefault()

                this.el.btnSend.click()
            }
        })

        this.el.inputText.on('keyup', e => {
            if(this.el.inputText.innerHTML.length){
                this.el.inputPlaceholder.hide()
                this.el.btnSendMicrophone.hide()
                this.el.btnSend.show()
            }else{
                this.el.inputPlaceholder.show()
                this.el.btnSendMicrophone.show()
                this.el.btnSend.hide()
            }
        })

        this.el.btnSend.on('click', e => {

        })

        this.el.btnEmojis.on('click', e => {
            this.el.panelEmojis.toggleClass('open')
        })

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {
            emoji.on('click', e => {
                let img = this.el.imgEmojiDefault.cloneNode()

                img.style.cssText = emoji.style.cssText
                img.dataset.unicode = emoji.dataset.unicode
                img.alt = emoji.dataset.alt

                emoji.classList.forEach(name  => {
                    img.classList.add(name)
                })

                let cursor = window.getSelection()

                if(!cursor.focusNode || !cursor.focusNode.id === 'input-text'){
                    this.el.inputText.focus()
                    cursor = window.getSelection()
                }

                let range = document.createRange()

                range = cursor.getRangeAt(0)
                range.deleteContents()

                let frag = document.createDocumentFragment()

                frag.appendChild(img)

                range.insertNode(frag)

                range.setStartAfter(img)

                this.el.inputText.dispatchEvent(new Event('keyup'))
            })
        })
    }

    closeMenuAttach(e){
        document.removeEventListener('click', this.closeMenuAttach)
        this.el.menuAttach.removeClass('open')
    }

    closeAllLeftPanels(){
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }

    closeAllMainPanel(){
        this.el.panelMessagesContainer.hide()
        this.el.panelDocumentPreview.removeClass('open')
        this.el.panelCamera.removeClass('open')
    }

    closeRecordMicrophone(){
        this.el.recordMicrophone.hide()
        this.el.btnSendMicrophone.show()
        clearInterval(this._recordMicrophoneInterval)
    }

    startRecordMicrophoneTime(){
        let start = Date.now()

        this._recordMicrophoneInterval = setInterval( _ => {
            this.el.recordMicrophoneTimer.innerHTML = Format.toTime((Date.now() - start))
        },100)
    }
}
