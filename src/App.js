import { useEffect, useState } from "react"

window.stream = null

const App = () => {
    const [list_device, set_list_device] = useState({})
    const [err, set_err] = useState({})

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
        const devices = await navigator.mediaDevices.enumerateDevices()
        console.log(devices)
        await set_list_device(devices)
    }

    const get_media = async () => {
        try {
            const media = await navigator.mediaDevices.getUserMedia(constraints)
            await get_device()
            const video = document.querySelector("#localstream")
            window.stream = media
            video.srcObject = media

            if ("srcObject" in video) {
                video.srcObject = media
            } else {
                video.src = window.URL.createObjectURL(media)
            }
            video.onloadedmetadata = async (e) => {
                await video.play()
                e = await media.getVideoTracks()[0]
            }
        } catch (error) {
            console.log('get_media', error)
            set_err(error)
        }
    }

    useEffect(() => {
        get_media()
    }, [])

    return (<div class="container text-center mt-5">
        <video id="localstream" width="320" height="240" controls>
            Your browser does not support the video tag.
        </video>

        <div>
            <h3>List device input/output</h3>
            {list_device && JSON.stringify(list_device)}
        </div>

        <div>
            {err && JSON.stringify(err)}
        </div>
    </div>)
}

export default App
