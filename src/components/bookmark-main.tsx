import type { BookMarkDataType } from "../App"
import type { JSX, RefObject, MouseEvent } from "react"

export function Main({currentBookmarksData, selectedBookmarkTags, currentSearchContents, handleDelete, dialogDeleteRef, handleCancelDelete, handleConfirmDelete}:{currentBookmarksData:BookMarkDataType[], selectedBookmarkTags:string[], currentSearchContents:string, handleDelete:(e:MouseEvent<HTMLButtonElement>, bookmarkID:string) => void, dialogDeleteRef:RefObject<HTMLDialogElement | null>, handleCancelDelete:()=> void, handleConfirmDelete:() => void}){
    
    const filteredBookMarksData = selectedBookmarkTags.length >= 1 ? currentBookmarksData.filter((Bookmark) => {
        const matchedTags = Bookmark.tags.filter((tag) => selectedBookmarkTags.includes(tag))
        return( matchedTags.length >= 1 ? true : false )
    }) : currentBookmarksData

    const bookmarksThatMatchSearch = currentSearchContents.length >= 1 ? currentBookmarksData.filter((Bookmark) => {
            const matchFound = Bookmark.title.toLowerCase().includes(currentSearchContents) || Bookmark.title.includes(currentSearchContents)
            return matchFound
        }
    ) : currentBookmarksData

    const cardCollectionMaker = (array:BookMarkDataType[]): JSX.Element[] => {
        const cardCollection = array.map((bookmark) => {
        const lastVisitedDateTimestamp = bookmark.lastVisited ? Date.parse(bookmark.lastVisited) : null
        const rawCreatedAtDateTimestamp =  Date.parse(bookmark.createdAt)

        const fulllastVisitedDate = lastVisitedDateTimestamp ? new Date(lastVisitedDateTimestamp) : null
        const fullCreatedAtDate = new Date(rawCreatedAtDateTimestamp)
        
        const lastVisitedDateMonth =  fulllastVisitedDate ? fulllastVisitedDate.toString().substring(4, 7) : null
        const lastVisitedDate = fulllastVisitedDate ? fulllastVisitedDate.getDate().toString() : null

        const createdAtDateMonth =  fullCreatedAtDate ? fullCreatedAtDate.toString().substring(4, 7) : null
        const createdAtDate = fullCreatedAtDate ? fullCreatedAtDate.getDate().toString() : null
        
        const bookMarkTags = bookmark.tags.map((tag)=>{
            return(
            <p key={`${bookmark.id}-${bookmark.title}-${tag}-tag`} className="bookmark-main__card-tag">{tag}</p>
            )
        })
        
        return(
            <article key={bookmark.id} className="bookmark-main__card">
                <header className="bookmark-main__card-header">
                    <img className="bookmark-man__card-favicon-icon" src={bookmark.favicon} alt={`${bookmark.title} favicon icon`}/>
                    <h2 className="bookmark-main__card-title">
                        {bookmark.title}
                    </h2>
                    <p className="bookmark-main__card-site">{bookmark.url}</p>
                    <button className="bookmark-main__card-more-items-button" popoverTarget={`${bookmark.title}-popover`}><img className="bookmark-main__card-menu-icon" src="/images/icon-menu-bookmark.svg" alt="bookmark menu icon"/></button>
                    <dialog id={`${bookmark.title}-popover`} className="bookmark-main__card-dialog-popover" popover="auto">
                            <section className="bookmark-main__card-dialog-popover-actions"
                            aria-label="bookmark actions menu">
                                <a className="bookmark-main_popover-link" href={bookmark.url} tabIndex={0}><img className="bookmark-main_popover-link-image" src="/images/icon-visit.svg" alt="visit icon"/>Visit</a>
                                <button className="bookmark-main_popover-button"
                                data-bookmark-id={bookmark.id} onClick={(e) => handleDelete(e, bookmark.id)} 
                                ><img src="/images/icon-delete.svg" alt="delete icon"/>Delete</button>
                            </section>
                    </dialog>
                </header>
                <div className="bookmark-main__card-description-and-tags-wrapper">
                    <p className="bookmark-main__card-description">{bookmark.description}</p>
                    <div className="bookmark-main__card-tags-wrapper">
                        {bookMarkTags}
                    </div>
                </div>
                <footer className="bookmark-main__card-footer">
                    <div className="bookmark-main__card-visits-creation-and-last-visit-wrapper">
                        <div className="bookmark-main__visit-icon-and-count-wrapper">
                            <img className="bookmark-main__card-visit-count-icon" src="/images/icon-visit-count.svg" alt="visit icon"/>
                            <p className="bookmark-main__card-visit-count">{bookmark.visitCount}</p>
                        </div>
                        
                        <div className="bookmark-main__creation-icon-and-creation-date-wrapper">
                            <img className="bookmark-main__card-creation-date-icon" src="/images/icon-created.svg" alt="last visit icon"/>
                            <p className="bookmark-main__card-creation-date">{`${createdAtDate} ${createdAtDateMonth}`}</p>
                        </div>

                        <div className="bookmark-main__last-visited-icon-and-last-visited-date-wrapper">
                            <img className="bookmark-main__last-visited-date-icon" src="/images/icon-last-visited.svg" alt="last visit icon"/>
                            <p className="bookmark-main__card-last-visited-date">{bookmark.lastVisited != null ? `${lastVisitedDate} ${lastVisitedDateMonth}` : null}</p>
                        </div>
                    </div>
                </footer>
            </article>
        )
    })
        return( cardCollection )
    }

    return(
        <main className="bookmarks-main">
            <div className="bookmarks-main__headline-and-sort-button-wrapper">
                <h1 id="main-headline" className="bookmarks-main__headline">{currentSearchContents != "" ? `Results for: ${currentSearchContents}` : "All bookmarks"}</h1>
            </div>
            <section aria-labelledby="main-headline" className="bookmarks-main__bookmark-cards-grid-wrapper">
                {currentSearchContents.length >= 1 ? cardCollectionMaker(bookmarksThatMatchSearch) : cardCollectionMaker(filteredBookMarksData)}
            </section>
            <dialog ref={dialogDeleteRef} className="bookmarks-main__dialog-delete">
                <section className="bookmarks-main__dialog-delete-contents-wrapper" aria-labelledby="delete-dialog-heading">
                    <header className="bookmarks-main__dialog-delete-header">
                        <h2 id="delete-dialog-heading" className="bookmarks-main__dialog-delete-headline">Delete bookmark</h2>
                        <button className="bookmarks-main__dialog-close-button"
                        onClick={handleCancelDelete}
                        ><img src="/images/icon-close.svg"/></button>
                    </header>
                    <p className="bookmarks-main__dialog-delete-description">Are you sure you want to delete this bookmark?</p>
                    <div className="bookmarks-main__dialog-delete-buttons-wrapper">
                        <button className="bookmarks-main__dialog-delete-cancel"
                        onClick={handleCancelDelete}
                        >Cancel</button>
                        <button className="bookmarks-main__dialog-delete-permanently" onClick={handleConfirmDelete}
                        >Delete permanently</button>
                    </div>
                </section>
            </dialog>
        </main>

    )
}