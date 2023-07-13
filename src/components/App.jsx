import { useState, useEffect } from 'react';
import { fetchImages } from '../services/Api';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const per_page = 12;

  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = async (searchQuery, page) => {
    if (!searchQuery) {
      return;
    }
    setIsLoading(true);

    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      if (hits.length === 0) {
        return alert('Sorry nothing found');
      }
      console.log(hits, totalHits);
      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / per_page));
    } catch (error) {
          } finally {
      setIsLoading(false);
    }
  };

  const formSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  const onloadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
      };



  const openModal = largeImageURL => {
    console.log(largeImageURL);
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
   <>
        <Searchbar onSubmit={formSubmit} />
{images.length > 0 && !page && (
          <>
            <ImageGallery images={images} onClick={openModal} />
            {loadMore && isLoading < fetchImages && (
              <p>No more pictures</p>
            )}
          </>
        )}
        
        {<ImageGallery images={images} openModal={openModal} />
        }

        {loadMore && <Button onloadMore={onloadMore} page={page} />}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={closeModal} />
        )}
        {isLoading && <Loader />}
      </>
  );
  // }
};


// export class App extends Component {
//   state = {
//     searchQuery: '',
//     images: [],
//     page: 1,
//     per_page: 12,
//     isLoading: false,
//     loadMore: false,
//     error: null,
//     showModal: false,
//     largeImageURL: 'largeImageURL',
//     id: null,
//   };

//   componentDidUpdate(_, prevState) {
//     console.log(prevState.page);
//     console.log(this.state.page);
//     const { searchQuery, page } = this.state;
//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       this.getImages(searchQuery, page);
//     }
//   }

//   getImages = async (query, page, perPage) => {
//     this.setState({ isLoading: true });
//     if (!query) {
//       return;
//     }
//     try {
//       const { hits, totalHits } = await fetchImages(query, page, perPage);
//       console.log(hits, totalHits);
//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   formSubmit = searchQuery => {
//     this.setState({
//       searchQuery,
//       images: [],
//       page: 1,
//       loadMore: false,
//     });
//   };

//   onloadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//       };
  
//   openModal = largeImageURL => {
//     console.log(largeImageURL);
//     this.setState({
//       showModal: true,
//       largeImageURL: largeImageURL,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       showModal: false,
//     });
//   };

//   render() {
//     const { images, isLoading, loadMore, page, showModal, largeImageURL } =
//       this.state;
//     return (
//       <>
//         <Searchbar onSubmit={this.formSubmit} />
// {images.length > 0 && !page && (
//           <>
//             <ImageGallery images={images} onClick={this.openModal} />
//             {loadMore && isLoading < fetchImages && (
//               <p className="Message">No more pictures</p>
//             )}
//           </>
//         )}
        
//         {<ImageGallery images={images} openModal={this.openModal} />
//         }

//         {loadMore && <Button onloadMore={this.onloadMore} page={page} />}

//         {showModal && (
//           <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
//         )}
//         {isLoading && <Loader />}
//       </>
//     );
//   }
// }
