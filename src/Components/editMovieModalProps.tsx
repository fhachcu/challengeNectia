import {EditMovieModalProps} from '../Interfaces/interfaces';
  
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
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit movie</h5>
              <button type="button" className="close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className='fw-bold'>Title</label>
                  <input type="text" name="title" value={movie.title} onChange={handleChange} className="form-control" pattern="[a-zA-Z0-9\s]+" required/>
                </div>
                <div className="form-group">
                  <label className='fw-bold'>Genere</label>
                  <input type="text" name="genere" value={movie.genere} onChange={handleChange} className="form-control" pattern="[a-zA-Z0-9\s]+" required/>
                </div>
                <div className="form-group">
                  <label className='fw-bold'>Year</label>
                  <input type="number" name="year" value={movie.year} onChange={handleChange} className="form-control" pattern="[0-9]+"/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };