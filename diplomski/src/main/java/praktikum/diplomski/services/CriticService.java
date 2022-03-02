package praktikum.diplomski.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.Critic;
import praktikum.diplomski.repositories.CriticRepository;

@Service
public class CriticService {
	@Autowired
	private CriticRepository criticRepo;

	@Autowired
	private LoginService loginServ;

	@Autowired
	private AccountDataService accountServ;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public CriticService() {
	}

	public Iterable<Critic> getCritics() {
		return criticRepo.findAll();
	}

	public Optional<Critic> getCriticById(Long id) {
		return criticRepo.findById(id);
	}

	public Optional<Critic> getCriticByUsername(String username) {
		return criticRepo.getByUsername(username);
	}

	public void addCritic(Critic critic) {
		loginServ.addPermsion(critic.getAccountData(), "ROLE_CRITIC");
		critic.getAccountData().setPassword(passwordEncoder.encode(critic.getAccountData().getPassword()));
		criticRepo.save(critic);
	}

	public void removeCritic(Long id) {
		Optional<Critic> critic = criticRepo.findById(id);
		Critic c = critic.get();
		c.setDeleted(true);
		criticRepo.delete(critic.get());
	}

	public void updateCritic(String username, Critic critic) {
		Optional<Critic> Cri = criticRepo.getByUsername(username);
		if (Cri.isPresent()) {
			critic.setId(Cri.get().getId());
			critic.getAccountData().setPassword(passwordEncoder.encode(critic.getAccountData().getPassword()));
			criticRepo.save(critic);
			accountServ.updateAccountData(critic.getAccountData().getId(), critic.getAccountData());
		}
	}

	public Iterable<Optional<Critic>> getCriticsByFirstName(String firstName) {
		return criticRepo.findCriticsByFirstName("%" + firstName + "%");
	}

	public Iterable<Optional<Critic>> getCriticsByLastName(String lastName) {
		return criticRepo.findCriticsByLastName("%" + lastName + "%");
	}

}
