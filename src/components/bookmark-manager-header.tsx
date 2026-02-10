import type { ChangeEvent } from 'react'

export function Header({currentSearchContents, handleSearchEntry, handleHamburgerMenuClick}:{currentSearchContents:string, handleSearchEntry:(e:ChangeEvent<HTMLInputElement>) => void, handleHamburgerMenuClick:() => void}){

    return(
        <header className="bookmark-manager-header">
            <div className='bookmark-manager-header__menu-button-and-search-input-wrapper'>
                <button className="bookmark-manager-header__menu-button" onClick={handleHamburgerMenuClick}><img className="bookmark-manager-header__menu-icon"  src="/images/icon-menu-hamburger.svg" alt="menu icon"/></button>
                <div className="bookmark-manager-header__search-input-and-icon-wrapper">
                    <img className="bookmark-manager-header__search-icon" src="/images/icon-search-forest-green.svg" alt="menu icon"/>
                    <input className="bookmark-manager-header__search-input" aria-label="search for bookmarks by title" placeholder="Search by title" value={currentSearchContents} onChange={(e) => handleSearchEntry(e)}/>
                </div>
            </div>
            <div className='.bookmark-manager-header__profile-photo-wrapper'>
                <img className="bookmark-manager-header__profile-photo" src="/images/image-avatar.webp"/>
            </div>
        </header>
    )
}