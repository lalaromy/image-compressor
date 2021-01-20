import React, { useState } from 'react'
import "../styles/styles.css"

interface Blob {
  size: number,
  type: string
}
export default function Upload(props: any): JSX.Element {
  const [done, setDone] = useState<Boolean>(false)
  const [loading, setLoading] = useState<Boolean>(false)
  const [oldSize, setOldSize] = useState<number>()
  const [newSize, setNewSize] = useState<number>()

  const drawCanvas = (name: string): void => {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const newImage: any = document.getElementById("source_image");
    canvas.width = newImage.width / 1.6
    canvas.height = newImage.height / 1.6
    const ctx: CanvasRenderingContext2D | any = canvas.getContext('2d')
    ctx.drawImage(newImage, 0, 0, newImage.width / 1.6, newImage.height / 1.6);
    const imageType: string = "image/jpeg"
    const imageArguments: number = 3
    const newDataUrl = canvas.toDataURL(imageType, imageArguments);
    const i: any = document.getElementById("compress_image");
    i.src = newDataUrl
    setDone(true)
    setLoading(false)

    canvas.toBlob(function (blob: Blob | any) {
      let link: HTMLAnchorElement = document.createElement('a');
      link.download = name;
      link.href = URL.createObjectURL(blob);
      link.click();
      setNewSize(blob.size / 1000000)
      URL.revokeObjectURL(link.href);
    }, 'image/png');

  }

  const uploadImage = (e: React.SyntheticEvent<any>): void => {
    setLoading(true)
    const target = e.target as HTMLInputElement
    const file: File = (target.files as FileList)[0];
    setOldSize(file.size / 1000000)
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent): void => {
      const image: HTMLElement | any = document.getElementById("source_image");
      const eTarget: EventTarget | null = event.target
      image.src = reader.result
      image.onload = function (e: any) {
        drawCanvas(file.name)
      }
    }
    reader.readAsDataURL(file);
  }

  const renew = () => {
    setDone(false)
    setOldSize(0)
    setNewSize(0)
    const source_image: HTMLElement | any = document.getElementById("source_image");
    source_image.src = ""
    const compress_image: any = document.getElementById("compress_image");
    compress_image.src = ""
  }


  return (
    <div className="upload-container">
      {!done ?
        <input
          type="file"
          onChange={(e) => uploadImage(e)}
          className="file-input"
        /> : <div
          className="reload-button"
          onClick={() => renew()}>New Image</div>}

      {loading ?
        <img className="bonsai-animation" src="../bonsai.png" alt="Bonsai" />
        :
        null}

      {oldSize ? <p>From: {oldSize.toFixed(3)} GB</p> : null}
      {newSize ? <p>To: {newSize.toFixed(3)} GB</p> : null}

      <div className="image-container">
        <img id="source_image" />
        <img id="compress_image" />
      </div>
    </div>
  );
};

