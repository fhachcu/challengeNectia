import { FaTimesCircle } from 'react-icons/fa';
import {CreateMovieModalProps} from '../Interfaces/interfaces';
import { IoIosFilm } from 'react-icons/io';

export const CreateMovieModal = ({ show, onClose, onCreate, movie, setMovie }: CreateMovieModalProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setMovie({ ...movie, [name]: value });
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onCreate(movie);
    };

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      setMovie({ id: 0, title: '', genere: '', year: 0 });
      onClose();
    }; 
  
    return (
      <div className="modal modal-background" style={{ display: show ? 'block' : 'none' }} tabIndex={-1} role="dialog">
        <div className="modal-dialog animate__animated animate__rotateIn" role="document">
          <div className="modal-content">
            <div className="modal-header pb-2">
              <div className='d-flex'>
                <IoIosFilm className='icon-create-movie'/>
                <h5 className="modal-title edit-title">New movie</h5>
              </div>
              <button className='blank-button' onClick={handleClose}><FaTimesCircle className='icon-style' /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group my-3">
                  <label className='fw-bold pb-2'>Title:</label>
                  <input type="text" name="title" value={movie.title} onChange={handleChange} className="form-control" pattern="[a-zA-Z0-9\s]+" maxLength={40} minLength={2} required/>
                </div>
                <div className="form-group my-3">
                  <label className='fw-bold pb-2'>Genere:</label>
                  <input type="text" name="genere" value={movie.genere} onChange={handleChange} className="form-control" pattern="[a-zA-Z0-9\s]+" maxLength={40} minLength={2} required/>
                </div>
                <div className="form-group my-3">
                  <label className='fw-bold pb-2'>Year</label>
                  <input type="number" name="year" value={movie.year} onChange={handleChange} className="form-control" maxLength={4} minLength={4} pattern="[0-9]+"/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-boostrap">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };