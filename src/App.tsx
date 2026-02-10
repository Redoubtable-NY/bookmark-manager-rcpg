import { useState, useRef } from 'react'
import type { ChangeEvent } from 'react'
import { Header } from './components/bookmark-manager-header'
import { MobileModalMenu } from './components/bookmark-manager-dialog'
import { BookmarkSidebar } from './components/bookmark-sidebar-menu'
import { Main } from './components/bookmark-main'
import './App.css'
import json from './data.json'

export type BookMarkDataType = {
  id: string;
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: string[];
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  createdAt: string;
  lastVisited: string;
} | {
  id: string;
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: string[];
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  createdAt: string;
  lastVisited: null;
}
const initialBookmarksData: BookMarkDataType[] = json.bookmarks
const initialBookMarksTags: string[] = []
export type BookmarkTagsCountType = {
  [key: string]: number,
  AI: number, 
  Community: number, 
  Compatibility: number, 
  CSS: number, 
  Design: number, 
  Framework: number, 
  Git: number,
  HTML: number, 
  JavaScript: number, 
  Layout: number,
  Learning: number, 
  Performance: number, 
  Practice: number, 
  Reference: number, 
  Tips: number, 
  Tools: number, 
  Tutorial: number,
}
const initialBookmarkTagsCount:BookmarkTagsCountType = {
  AI: 0, 
  Community: 0, 
  Compatibility: 0, 
  CSS: 0, 
  Design: 0, 
  Framework: 0, 
  Git: 0,
  HTML: 0, 
  JavaScript: 0, 
  Layout: 0,
  Learning: 0, 
  Performance: 0, 
  Practice: 0, 
  Reference: 0, 
  Tips: 0, 
  Tools: 0, 
  Tutorial: 0,
}
for(const bookmark of initialBookmarksData){
  initialBookMarksTags.push(...bookmark.tags)
}
for(const tag of initialBookMarksTags){
  initialBookmarkTagsCount[tag] = initialBookmarkTagsCount[tag] + 1
}


function App() {
  const [currentBookmarksData, setCurrentBookmarksData] = useState<BookMarkDataType[]>(initialBookmarksData)
  const [currentBookmarksTagCounts, setCurrentBookmarksTagsCounts] = useState<BookmarkTagsCountType>(initialBookmarkTagsCount)
  const [selectedBookmarkTags, setSelectedBookmarkTags] = useState<string[]>([])
  const [currentSearchContents, setSearchContents] = useState<string>("")
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const dialogDeleteRef = useRef<HTMLDialogElement | null>(null)
  const deletedBookIdStorageRef = useRef<string>("")

  function handleSearchEntry(e:ChangeEvent<HTMLInputElement>){
    setSearchContents(e.currentTarget.value)
    setSelectedBookmarkTags([])
  }

  function handleSelectedTagsUpdater(e:ChangeEvent<HTMLInputElement>):void{
    if(e.target.checked === true){
      const clickedCheckbox = e.currentTarget ? e.currentTarget.name : null
      if(clickedCheckbox){
        setSelectedBookmarkTags((prevSelectedBookmarkTags) => {
          const newArrayWithTag = [...prevSelectedBookmarkTags]
          newArrayWithTag.push(clickedCheckbox)
          return newArrayWithTag 
        })
      }
    }else if(e.target.checked === false){
      const clickedCheckbox = e.currentTarget ? e.currentTarget.name : null
      if(clickedCheckbox){
        setSelectedBookmarkTags((prevSelectedBookmarkTags) => {
          const newArrayWithoutTag = prevSelectedBookmarkTags.filter((tag) => tag != clickedCheckbox)
          return newArrayWithoutTag
        })
      }
    }
  }

  function handleHamburgerMenuClick(){
    if(dialogRef.current){
      dialogRef.current.showModal()
    }
  }

  function handleModalCloseClick(){
    if(dialogRef.current){
      dialogRef.current.close()
    }
  }

  function handleDelete(bookmarkID:string){
    deletedBookIdStorageRef.current = ""
    if(dialogDeleteRef.current){
      dialogDeleteRef.current.showModal()
      deletedBookIdStorageRef.current = bookmarkID
    }
  }

  function handleCancelDelete(){
    if(dialogDeleteRef.current){
      dialogDeleteRef.current.close()
    }
  }

  function handleConfirmDelete(){
    if(dialogDeleteRef.current){
      setCurrentBookmarksTagsCounts((prevBookMarkTagCounts) => {
        const tagCountLessDeletedBookmark = {...prevBookMarkTagCounts}
        const deletedBookmark = currentBookmarksData.filter((bookmark) => {
          return bookmark.id === deletedBookIdStorageRef.current
        })
        const deletedBookmarkTags = deletedBookmark[0].tags
        for(const tag of deletedBookmarkTags){
          if(tagCountLessDeletedBookmark[tag] > 0){
            tagCountLessDeletedBookmark[tag] = tagCountLessDeletedBookmark[tag] - 1
          }
        }
        return tagCountLessDeletedBookmark
      })
      
      setCurrentBookmarksData((prevBookmarksData) => {
        const editedBookmarksData = prevBookmarksData.filter((bookmark) => {
          return bookmark.id != deletedBookIdStorageRef.current
        })
        return editedBookmarksData
      })

      dialogDeleteRef.current.close()
    }
  }


  function handleSidebarTagReset(){
    setSelectedBookmarkTags([])
  } 

  return (
    <div className='app-wrapper'>
      <Header currentSearchContents={currentSearchContents} handleSearchEntry={handleSearchEntry} handleHamburgerMenuClick={handleHamburgerMenuClick}/>
      <MobileModalMenu dialogRef={dialogRef}>
        <BookmarkSidebar currentBookmarksTagCounts={currentBookmarksTagCounts} handleModalCloseClick={handleModalCloseClick} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags} handleSidebarTagReset={handleSidebarTagReset}/>
      </MobileModalMenu>
      <BookmarkSidebar currentBookmarksTagCounts={currentBookmarksTagCounts} handleModalCloseClick={handleModalCloseClick} handleSelectedTagsUpdater={handleSelectedTagsUpdater} selectedBookmarkTags={selectedBookmarkTags} handleSidebarTagReset={handleSidebarTagReset}/>
      <Main currentBookmarksData={currentBookmarksData} selectedBookmarkTags={selectedBookmarkTags} currentSearchContents={currentSearchContents} handleDelete={handleDelete} dialogDeleteRef={dialogDeleteRef} handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete}/>
    </div>
  )
}

export default App
