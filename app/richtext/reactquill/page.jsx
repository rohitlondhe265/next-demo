"use client"

import React, { useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"

const ReactQuill = dynamic(
  async () => {
    const ReactQuill = (await import("react-quill")).default

    return ({
      forwardedRef,
      ...rest
    }) => <ReactQuill ref={forwardedRef} {...rest} />
  },
  {
    ssr: false,
  },
)

export default function App() {
const [value, onValueChange] = useState('');
  const quillRef = useRef(null)
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  )

  function imageHandler() {
    if (!quillRef.current) return

    const editor = quillRef.current.getEditor()
    const range = editor.getSelection()
    const value = prompt("Please enter the image URL")

    if (value && range) {
      editor.insertEmbed(range.index, "image", value, "user")
    }
  }

  return (
      <ReactQuill
        forwardedRef={quillRef}
        theme="snow"
        defaultValue={value}
        onChange={onValueChange}
        modules={modules}
      />
  )
}