import  fetchUrl from '../shared/fetchUrl/fetchUrl';

export async function getBooksByType(type: string) {
    try {
        const allBooks = await fetchUrl(`https://www.googleapis.com/books/v1/volumes?q=${type}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        });
        
        return allBooks.items.map((item: any) => {
          
          const { volumeInfo: {
              title = "", 
              authors = [], 
              publisher = '', 
              publishedDate,
              imageLinks: {thumbnail: coverUrl = ''} = {}
            } 
          } = item || {};
          const { searchInfo: {textSnippet: description = ''} = {} } = item || {}

            return {
                            id: item.id,
                            title,
                            authors,
                            description,
                            publisher,
                            publishedDate: publishedDate
                                ? new Date(publishedDate).toISOString()
                                : undefined,
                            coverUrl,
                            isRead: Math.random() >= 0.5
                        };
                    });
    } catch(exception) {
        return [];

    }
}

