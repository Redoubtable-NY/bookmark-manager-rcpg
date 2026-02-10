
import type { ReactNode, RefObject } from "react"

export function MobileModalMenu({dialogRef, children}:{dialogRef:RefObject<HTMLDialogElement | null> , children:ReactNode}){
    return(
        <dialog className="mobile-modal" ref={dialogRef}>
            {children}
        </dialog>
    )
} 