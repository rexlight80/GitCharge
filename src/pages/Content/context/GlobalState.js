import React,{ createContext, useState } from "react";



export const GlobalContext = createContext(null);
export const GlobalProvider = ({children}) => {

    const[isLoading, setIsLoading] = useState(false);
    const[isPinned, setIsPinned] = useState(false);
    const[isSearch, setIsSearch] = useState(false);
    const[searchValue, setSearchValue] = useState('');
    const[isAllExpanded, setIsAllExpanded] = useState(false);
    const[isBookmark, setIsBookmark] = useState(false);
    const[showMergedList, setShowMergedList] = useState(false);
    const[bookmarkList, setBookmarkList] = useState([]);
    const[bookmarkSearchValue, setBookmarkSearchValue] = useState('');
    const[typeValues, setTypeValues] = useState([]);
    const[sortByValue, setSortByValue] = useState('');
    const[orderByValue, setOrderByValue] = useState('');
    const[mergeReqComments, setMergeReqComments] = useState([]);
    const[mergeReqDiffFiles, setMergeReqDiffFiles] = useState([]);
    const[mergeReq, setMergeReq] = useState({});
    const[branch, setBranch] = useState('');
    const[singleCommit, setSingleCommit] = useState({});
    const[htmlDocument, setHtmlDocument]= useState(null);
    const[userDetail, setUserDetail]= useState({});
    const[showSummary, setShowSummary] = useState(false)
    
    return(
        <GlobalContext.Provider 
        value={{
            isLoading,
            isPinned,
            isSearch,
            isAllExpanded,
            showMergedList,
            isBookmark,
            searchValue,
            bookmarkList,
            bookmarkSearchValue,
            typeValues,
            sortByValue,
            orderByValue,
            mergeReqComments,
            mergeReqDiffFiles,
            branch,
            singleCommit,
            mergeReq,
            htmlDocument,
            userDetail,
            showSummary,
            setMergeReq,
            setBranch,
            setIsBookmark,
            setIsPinned,
            setIsAllExpanded,
            setIsLoading,
            setIsSearch,
            setShowMergedList,
            setSearchValue,
            setBookmarkList,
            setBookmarkSearchValue,
            setTypeValues,
            setSortByValue,
            setOrderByValue,
            setMergeReqComments,
            setMergeReqDiffFiles,
            setSingleCommit,
            setHtmlDocument,
            setUserDetail,
            setShowSummary
         }}>
        {children}
        </GlobalContext.Provider>
    )

}