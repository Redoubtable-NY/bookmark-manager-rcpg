import type { BookmarkTagsCountType } from "../App"
import type { ChangeEvent } from "react"
import { Checkbox } from "./checkbox"


export function BookmarkSidebar({currentBookmarksTagCounts, handleModalCloseClick, handleSelectedTagsUpdater, selectedBookmarkTags, handleSidebarTagReset}:{currentBookmarksTagCounts:BookmarkTagsCountType, handleModalCloseClick:() => void, handleSelectedTagsUpdater:(e:ChangeEvent<HTMLInputElement>) => void, selectedBookmarkTags:string[], handleSidebarTagReset:() => void}){
    return(
        <aside className="bookmark-manager-sidebar-menu">
                <header className="bookmark-manager-sidebar-menu__header">
                    <div className="bookmark-manager-sidebar-menu__headline-logo-wrapper"> 
                            <img src="/images/bookmark-manager-logo.svg" className="bookmark-manager-sidebar-menu__logo" alt="bookmark manager logo"/>
                            <h2 className="bookmark-manager-sidebar-menu__headline">Bookmark Manager</h2>
                    </div>
                    <button className="bookmark-manager-sidebar-menu__close-button" onClick={handleModalCloseClick}><img src="/images/icon-close.svg" alt="close icon"/></button>
                </header>
                <nav className="bookmark-manager-sidebar-menu__navigation">
                    <a className="bookmark-manager-sidebar-menu__links" aria-current="page"><img className="bookmark-manager-sidebar-menu__link-images" src="/images/icon-home.svg" alt="home icon"/>Home</a>
                </nav>
                <section aria-labelledby="tags" className="bookmark-manager-sidebar-menu__tags-section">
                    <div className="bookmark-manager-sidebar-menu__tags-sub-headline-and-reset-wrapper">
                    <h3 id="bookmark-tags" className="bookmark-manager-sidebar-menu__tags-sub-headline">TAGS</h3>
                    {selectedBookmarkTags.length >= 1 ? <button className="bookmark-manager-sidebar-menu__reset-button" onClick={handleSidebarTagReset}>Reset</button> : null}
                    </div>
                    <div className="bookmark-manager-sidebar-menu__tag-inputs-and-labels-wrapper ">
                        
                        <Checkbox checkboxValueAttribute="AI" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>AI</Checkbox>

                        <Checkbox checkboxValueAttribute="Community" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>Community</Checkbox>

                        <Checkbox checkboxValueAttribute="Compatibility" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>Compatibility</Checkbox>

                        <Checkbox checkboxValueAttribute="CSS" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>CSS</Checkbox>

                        <Checkbox checkboxValueAttribute="Design" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>Design</Checkbox>

                        <Checkbox checkboxValueAttribute="Framework" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>Framework</Checkbox>
                        
                        <Checkbox checkboxValueAttribute="Git" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>Git</Checkbox>

                        <Checkbox checkboxValueAttribute="HTML" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>HTML</Checkbox>

                        <Checkbox checkboxValueAttribute="JavaScript" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>JavaScript</Checkbox>

                        <Checkbox checkboxValueAttribute="Layout" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>Layout</Checkbox>

                        <Checkbox checkboxValueAttribute="Learning" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>Learning</Checkbox>

                        <Checkbox checkboxValueAttribute="Performance" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>Performance</Checkbox>

                        <Checkbox checkboxValueAttribute="Practice" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>Practice</Checkbox>

                        <Checkbox checkboxValueAttribute="Reference" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>Reference</Checkbox>

                        <Checkbox checkboxValueAttribute="Tips" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>Tips</Checkbox>

                        <Checkbox checkboxValueAttribute="Tools" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>Tools</Checkbox>

                        <Checkbox checkboxValueAttribute="Tutorial" currentBookmarksTagCounts={currentBookmarksTagCounts} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags}>Tutorial</Checkbox>
                    </div>
                </section>
            </aside>
    )
}