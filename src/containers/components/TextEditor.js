// npm install react-quilljs quill
import "quill/dist/quill.snow.css"; // Add css for snow theme
// import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";

export const TextEditor = ({
    placeHolder,
    value,
    setValue,
    name,
    detail,
    edit,
}) => {
    let theme = "snow";
    const modules = {
        toolbar: detail
            ? []
            : [
                  [{ font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike"],
                  [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                  ],
              ],
    };

    const placeholder = placeHolder;

    const formats = [
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "indent",
    ];

    const { quill, quillRef } = useQuill({
        theme,
        modules,
        formats,
        placeholder,
    });

    // getText format
    useEffect(() => {
        if (quill && detail) {
            value && quill.clipboard.dangerouslyPasteHTML(value);
            detail && quill.disable();
            let tagText = document.querySelector("div > .ql-editor");
            tagText.style.fontSize = "18px";
        }
        if (quill && !detail) {
            if (value) {
                quill.focus();
                let cursorPosition = quill.getSelection();
                quill.clipboard.dangerouslyPasteHTML(value);
                quill.setSelection(cursorPosition.index);
                let tagText = document.querySelector("div > .ql-editor");
                tagText.style.fontSize = "16px";
            }
        }
    }, [quill, value]);

    useEffect(() => {
        if (quill && !detail) {
            quill.on("text-change", (delta, oldDelta, source) => {
                // console.log(quill.getText()); // Get text only
                // console.log(quill.getContents()); // Get delta contents
                // console.log(quill.root.innerHTML); // Get innerHTML using quill
                // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
                setValue((prev) => ({
                    ...prev,
                    [name]: quill.root.innerHTML,
                }));
            });
        }
    }, [quill, name]);

    return (
        <>
            {detail ? (
                <div
                    className={`w-full h-[80%] border-[1px] border-lightgray border-solid bg-[#F5F5F5]`}
                >
                    {" "}
                    <div ref={quillRef} />
                </div>
            ) : edit ? (
                <div
                    className={`w-full h-[80%] border-[1px] border-lightgray border-solid`}
                >
                    {" "}
                    <div ref={quillRef} />
                </div>
            ) : (
                <div
                    className={`w-full h-[80%] border-[1px] border-lightgray border-solid`}
                >
                    <div ref={quillRef} />
                </div>
            )}
        </>
    );
};
