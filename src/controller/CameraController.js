export class CameraController {
    constructor(videoEl){
        this._videoEl = videoEl

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then( stream => {
            this._stream = stream
            //cria objetos em formato binario
            // this._videoEl.src = URL.createObjectURL(stream)
            this._videoEl.srcObject = stream
            this._videoEl.play()
        }).catch( err => {
            console.error(err)
        })
    }

    stop(){
        this._stream.getTracks().forEach(track => {
            track.stop()
        })
    }
}
