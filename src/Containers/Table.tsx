import React, { useState, useEffect } from 'react';
import api from '../Services/api';
import { CreateMovieModal } from '../Components/createMovieModalsProps';
import { EditMovieModal } from '../Components/editMovieModalProps';
import {ButtonConfirmation} from '../Components/buttonConfirmation';
import {Movie} from '../Interfaces/interfaces';
import { useHistory } from 'react-router-dom';

export const Table = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [newMovie, setNewMovie] = useState<Movie>({ id: 0, title: '', genere: '', year: 0 });
    const [editMovie, setEditMovie] = useState<Movie>({ id: 0, title: '', genere: '', year: 0 });
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get<Movie[]>('/movies');
                setMovies(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/movies/${id}`);
            setMovies(movies.filter((movie) => movie.id !== id));
            setMovieToDelete(null);
            setShowDeleteModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreate = async (movie: Movie) => {
        try {
            const response = await api.post<Movie>('/movies', movie);
            console.log("La respones-movie", response, movie);
            setMovies([...movies, response.data]);
            setShowCreateModal(false);
            setNewMovie({ id: 0, title: '', genere: '', year: 0 });
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (movie: Movie) => {
        try {
            const response = await api.put<Movie>(`/movies/${movie.id}`, movie);
            setMovies(movies.map((m) => (m.id === movie.id ? response.data : m)));
            setShowEditModal(false);
            setEditMovie({ id: 0, title: '', genere: '', year: 0 });
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditClick = (movie: Movie) => {
        setEditMovie(movie);
        setShowEditModal(true);
    };

    const logOut = () =>{
        localStorage.removeItem('token');
        history.push('./');
    }

    return (
        <div className="container">
            <h1 className='my-3'>Movies</h1>
            <div className='d-flex justify-content-between'>
                <button className="btn btn-primary mb-3 btn-boostrap" onClick={() => setShowCreateModal(true)}>
                    Create new movie
                </button>
                <button className="btn btn-primary mb-3 btn-boostrap" onClick={() => logOut()}>
                    Logout
                </button>
            </div>
            <table className="table table-striped table-bordered table-hover">
                <thead className='fs-4'>
                    <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Genere</th>
                        <th className='d-flex justify-content-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.title}</td>
                            <td>{movie.year}</td>
                            <td>{movie.genere}</td>
                            <td className='d-flex'>
                                <div className='d-flex justify-content-center w-100'>
                                    <button className="btn btn-warning" onClick={() => handleEditClick(movie)}>
                                        Edit
                                    </button>

                                </div>
                                <div className='d-flex justify-content-center w-100'>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            setMovieToDelete(movie);
                                            console.log("HOLAAA", movie)
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CreateMovieModal show={showCreateModal} onClose={() => setShowCreateModal(false)} onCreate={handleCreate} movie={newMovie} setMovie={setNewMovie} />
            <EditMovieModal show={showEditModal} onClose={() => setShowEditModal(false)} onSave={handleEdit} movie={editMovie} setMovie={setEditMovie} />
            {movieToDelete && (<ButtonConfirmation showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} movieToDelete={movieToDelete} handleDelete={handleDelete}/>)}
        </div>
    );
};