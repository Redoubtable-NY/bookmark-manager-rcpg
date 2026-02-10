import type { BookmarkTagsCountType } from "../App" 
import type { ReactNode , ChangeEvent } from "react"

export function Checkbox({currentBookmarksTagCounts, checkboxValueAttribute, handleSelectedTagsUpdater, selectedBookmarkTags, children}:{currentBookmarksTagCounts: BookmarkTagsCountType, checkboxValueAttribute:string, handleSelectedTagsUpdater:(e:ChangeEvent<HTMLInputElement>) => void, selectedBookmarkTags:string[], children:ReactNode }){

    const checked = selectedBookmarkTags.includes(checkboxValueAttribute)

    function localCheckboxChange(e:ChangeEvent<HTMLInputElement>){
        handleSelectedTagsUpdater(e)
    }
    
    return(
        <div className="bookmark-manager-sidebar-menu__tag-label-input-count-wrapper">
            <input className="sidebar-menu__tag-input" type="checkbox" name={`${checkboxValueAttribute}`} id={`${checkboxValueAttribute}`} checked={checked} onChange={localCheckboxChange}/>
            <label className="sidebar-menu__tag-input-label" htmlFor={`${checkboxValueAttribute}`}>{children}</label>
            <p className="sidebar-menu__tag-count">{currentBookmarksTagCounts[checkboxValueAttribute]}</p>
        </div>
    )
}