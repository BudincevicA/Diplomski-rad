package praktikum.diplomski.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.Actor;
import praktikum.diplomski.models.Film;
import praktikum.diplomski.repositories.ActorRepository;
import praktikum.diplomski.repositories.FilmRepository;

@Service
public class ActorService {
	@Autowired
	private ActorRepository actorRepo;
	
	@Autowired
	private FilmRepository filmRepo;

	public ActorService() {
	}

	public Iterable<Actor> getActors() {
		return actorRepo.findAll();
	}

	public Optional<Actor> getActorById(Long id) {
		return actorRepo.findById(id);
	}

	public void addActor(Actor actor) {
		actorRepo.save(actor);
	}

	public void removeActor(Long id) {
		Optional<Actor> actor = actorRepo.findById(id);
		actorRepo.delete(actor.get());
	}

	public void updateActor(Long id, Actor actor) {
		Optional<Actor> Act = actorRepo.findById(id);
		if (Act.isPresent()) {
			actor.setId(Act.get().getId());
			actorRepo.save(actor);
		}
	}

	public Iterable<Optional<Actor>> getActorsByFirstName(String firstName) {
		return actorRepo.findActorsByFirstName("%" + firstName + "%");
	}

	public Iterable<Optional<Actor>> getActorsByLastName(String lastName) {
		return actorRepo.findActorsByLastName("%" + lastName + "%");
	}
	
    public ArrayList<Film> getFilms(Long actorId) {
    	return filmRepo.findFilmsByActorId(actorId);
    }

}