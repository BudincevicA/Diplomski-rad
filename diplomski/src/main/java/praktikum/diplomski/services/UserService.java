package praktikum.diplomski.services;

import java.util.ArrayList;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.Film;
import praktikum.diplomski.models.User;
import praktikum.diplomski.repositories.FilmRepository;
import praktikum.diplomski.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private LoginService loginServ;

	@Autowired
	private AccountDataService accountServ;
	
	@Autowired
	private FilmRepository filmRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public UserService() {
	}

	public Iterable<User> getUsers() {
		return userRepo.findAll();
	}

	public Optional<User> getUserById(Long id) {
		return userRepo.findById(id);
	}

	public Optional<User> getUserByUsername(String username) {
		return userRepo.getByUsername(username);
	}

	public void addUser(User user) {
		loginServ.addPermsion(user.getAccountData(), "ROLE_USER");
		user.getAccountData().setPassword(passwordEncoder.encode(user.getAccountData().getPassword()));
		userRepo.save(user);
	}

	public void removeUser(Long id) {
		Optional<User> user = userRepo.findById(id);
		User c = user.get();
		c.setDeleted(true);
		userRepo.delete(user.get());
	}

	public void updateUser(String username, User user) {
		Optional<User> Cri = userRepo.getByUsername(username);
		if (Cri.isPresent()) {
			user.setId(Cri.get().getId());
			user.getAccountData().setPassword(passwordEncoder.encode(user.getAccountData().getPassword()));
			userRepo.save(user);
			accountServ.updateAccountData(user.getAccountData().getId(), user.getAccountData());
		}
	}
	
	public void addLikedFilm(String username, User user,Film film) {
		Optional<User> Cri = userRepo.getByUsername(username);
		if (Cri.isPresent()) {
			Set<Film> liked = user.getFilms();
			liked.add(film);
			user.setFilms(liked);
		}
	}

	public Iterable<Optional<User>> getUsersByFirstName(String firstName) {
		return userRepo.findUsersByFirstName("%" + firstName + "%");
	}

	public Iterable<Optional<User>> getUsersByLastName(String lastName) {
		return userRepo.findUsersByLastName("%" + lastName + "%");
	}
	
    public ArrayList<Film> getFilms(Long userId) {
    	return filmRepo.findFilmsByUsersId(userId);
    }
    
    public ArrayList<Film> getDislikes(Long userId) {
    	return filmRepo.findDislikesByUsersId(userId);
    }
	

}