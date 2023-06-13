import {EditMovieModalProps} from '../Interfaces/interfaces';
import { FaTimesCircle } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';


export const EditMovieModal = ({ show, onClose, onSave, movie, setMovie }: EditMovieModalProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setMovie({ ...movie, [name]: value });
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSave(movie);
    };
  
    return (
      <div className="modal modal-background" style={{ display: show ? 'block' : 'none' }} tabIndex={-1} role="dialog">
        <div className="modal-dialog animate__animated animate__rollIn" role="document">
          <div className="modal-content">
            <div className="modal-header pb-2">
              <div className='d-flex'>
                <BsPencilSquare className='icon-edit'/>
                <h5 className="modal-title edit-title">Edit movie</h5>
              </div>
              <button className='blank-button' onClick={onClose}><FaTimesCircle className='icon-style' /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body px-4">
                <div className="form-group my-3">
                  <label className='fw-bold pb-2'>Title</label>
                  <input type="text" name="title" value={movie.title} onChange={handleChange} className="form-control" pattern="[a-zA-Z0-9\s]+" maxLength={40} minLength={2} required/>
                </div>
                <div className="form-group my-3">
                  <label className='fw-bold pb-2'>Genere</label>
                  <input type="text" name="genere" value={movie.genere} onChange={handleChange} className="form-control" pattern="[a-zA-Z0-9\s]+" maxLength={40} minLength={2} required/>
                </div>
                <div className="form-group my-3">
                  <label className='fw-bold pb-2'>Year</label>
                  <input type="number" name="year" value={movie.year} onChange={handleChange} className="form-control" maxLength={4} minLength={4} pattern="[0-9]+"/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-boostrap">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };