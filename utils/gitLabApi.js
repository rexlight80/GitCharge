import { X_RAPIDAPI_HOST, X_RAPIDAPI_KEY } from "./env";

const myHeaders = new Headers();


const getProjectBySearch = async (groupName, projectName) => {
    const response = await fetch(`https://gitlab.com/api/v4/groups/${groupName}/projects?search=${projectName}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`${myHeaders.get('Authorization')}`
        }
      
    });
        
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            return `${error}`;
        }
    }

const getRepositoryTree = async (projectId, branch, subDirectoryPath, signal) => {
const response = await fetch(`https://gitlab.com/api/v4/projects/${projectId}/repository/tree?ref${branch ? `=${branch}`: ''}${subDirectoryPath !== undefined  ? `&path=${subDirectoryPath}`:'' }`, 
   {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`${myHeaders.get('Authorization')}`
            
        }
    },
    {signal})
    
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            return `${error}`;
        }
}





const getPullRequestTree = async (projectId, signal, state = 'all') => {

    const response = await fetch(`https://gitlab.com/api/v4/projects/${projectId}/merge_requests?state=${state}`, 
    {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`${myHeaders.get('Authorization')}`
            
        }
    },
    {signal})

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        return `${error}`;
    }
}

const getPullReqById = async (projectId, mergeId, type, signal) => {

    const response = await fetch(`https://gitlab.com/api/v4/projects/${projectId}/merge_requests/${mergeId}${type == 'Id'? '': `/${type=='files'? 'diffs':'notes'}`}`, 
    {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`${myHeaders.get('Authorization')}`
            
        }
    }, {signal})

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        return `${error}`;
    }
}

const getSingleCommit = async (projectId, sha, signal) => {
    const response = await fetch(`https://gitlab.com/api/v4/projects/${projectId}/repository/commits/${sha}`, 
        {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`${myHeaders.get('Authorization')}`
            
        }
    }, {signal})

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        return `${error}`;
    }
}

const getSearchResults = async (projectId, searchValue, signal) => {
    const response = await fetch(`https://gitlab.com/api/v4/projects/${projectId}/search?scope=blobs&search=${searchValue}`,
        {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`${myHeaders.get('Authorization')}`
            
        }
    }, {signal})

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        return `${error}`;
    }
}

const getAccessToken = async (id, secret, code, redirectUrl) => {
    const response = await fetch('https://gitlab.com/oauth/token', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:new URLSearchParams({
            client_id: id,
            client_secret: secret,
            grant_type: 'authorization_code',
            code:code,
            redirect_uri: redirectUrl
        })
    });

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        return `${error}`;
    }    
}

const getTokenFromRefreshToken = async (id, secret, token) => {
    const response = await fetch('https://gitlab.com/oauth/token', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:new URLSearchParams({
            client_id: id,
            client_secret: secret,
            grant_type: 'refresh_token',
            refresh_token: token
        })
    });

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        return `${error}`;
    }   
}

const revokeToken = async (id, secret, token) => {
    const response = await fetch('https://gitlab.com/oauth/revoke', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:new URLSearchParams({
            client_id: id,
            client_secret: secret,
            token: token
        })
    });

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        return `${error}`;
    }   
}

const signOut = async (token) => {
    const response = await fetch('https://gitlab.com/users/sign_out', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:new URLSearchParams({
            token: token
        })
    });

    try {
        const data = await response;
        return data;
    } catch (error) {
        return `${error}`;
    }  
}

const getUserDetail = async (signal) => {
        const response = await fetch('https://gitlab.com/api/v4/user', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`${myHeaders.get('Authorization')}`
                
            }
        },  {signal});

        try {
            const data = await response.json();
            return data;
        } catch (error) {
            return `${error}`;
        }
}

const getSummarizedText = async (text) => {
    const url = 'https://text-summarization13.p.rapidapi.com/data';
const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': X_RAPIDAPI_KEY,
		'x-rapidapi-host': X_RAPIDAPI_HOST,
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	body: new URLSearchParams({
		text: text
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	return result
} catch (error) {
	return `${error}`;
}
}


export { getProjectBySearch, getRepositoryTree, getPullRequestTree, getPullReqById, getSingleCommit, getSearchResults, getAccessToken, getTokenFromRefreshToken, getUserDetail, myHeaders, getSummarizedText, revokeToken, signOut};
