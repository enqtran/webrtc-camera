import { useState } from "react"

window.stream = null

const App = () => {
    const [list_device, set_list_device] = useState({})

    const constraints = {
        audio: false,
        video: {
            width: { min: 640, max: 2480, ideal: 1080 },
            height: { min: 480, max: 2480, ideal: 1080 },
            aspectRatio: { ideal: 1 },
            facingMode: { exact: "user" },
        }
    }

    const get_device = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices()
            await set_list_device(devices)
        } catch (error) {
            alert('get_device ' + error)
        }
    }

    const get_media = async () => {
        try {
            if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
                alert("Let's get this party started")
                const media = await navigator.mediaDevices.getUserMedia(constraints)
                await get_device()
                const video = document.querySelector("#localstream")
                window.stream = media

                if ("srcObject" in video) {
                    video.srcObject = media
                } else {
                    video.src = window.URL.createObjectURL(media)
                }
                video.autoplay = true;
                // video.onloadedmetadata = async (e) => {
                //     // await video.play()
                //     e = await media.getVideoTracks()[0]
                // }
            } else {
                alert("Not media")
            }

        } catch (error) {
            console.log('get_media', error)
            alert('get_media ' + error)
        }
    }

    return (<div className="container text-center mt-5">
        <video id="localstream" width="320" height="240" className="bg-secondary" autoplay>
            Your browser does not support the video tag.
        </video>

        <div>
            <button onClick={get_media} className="btn btn-primary shadaw-none">START CAMERA</button>
        </div>

        <div>
            <h3>List device input/output</h3>
            {list_device && JSON.stringify(list_device)}
        </div>
    </div>)
}

export default App
