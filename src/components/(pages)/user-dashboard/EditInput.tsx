import React from 'react'

type PagePropTypes = {
    onClose: () => void
    onEditChange: (value: string) => void
    titleInputValue: string | undefined,
    onEditSubmit: () => void
}

export default function EditInput({ onClose, onEditChange, titleInputValue, onEditSubmit }: PagePropTypes) {
    return (
        <section className="usereditinput-container">
            <div
                id="exit-edit"
                onClick={() => {
                    onClose()
                }}
            >
                X
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                onEditSubmit()
            }}>
                <div className="user-edit-panel-inputcontainer">
                    <label htmlFor="post-text-input" id="post-text-input">
                        Let&apos;s edit! :D
                    </label>
                    <textarea
                        onChange={(e) => {
                            onEditChange(e.target.value)
                        }}
                        value={titleInputValue}
                        required
                        className="post-edit-inputborder"
                        id="post-edit-text-input"
                        typeof="text"
                    ></textarea>
                    <input
                        id="post-edit-submitbtn"
                        type="submit"
                        value="EditSubmit"
                    ></input>
                </div>
            </form>
        </section>
    )
}
