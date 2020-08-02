import React, { useRef, useState } from 'react'

interface Party {
    name?: string
}

export default function PartyPage(): JSX.Element {
    const [party, setParty] = useState<Party>({})
    const nameInput = useRef<HTMLInputElement>(null)

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    if (nameInput.current) {
                        setParty({
                            name: nameInput.current.value
                        })

                        nameInput.current.value = ''
                    }
                }}
            >
                <label>
                    <span>{'Party name'}</span>
                    <input name="new-party" ref={nameInput} />
                </label>
                <button type="submit">{'Add party'}</button>
            </form>

            {party.name}
        </div>
    )
}
