package praktikum.diplomski.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.Administrator;
import praktikum.diplomski.repositories.AdministratorRepository;

@Service
public class AdministratorService {

    @Autowired
    private AdministratorRepository administratorRepo;

    @Autowired
    private LoginService loginServ;
    
    @Autowired
    private AccountDataService accountServ;
    
    @Autowired
	private PasswordEncoder passwordEncoder;
    
    public AdministratorService() {
    }

    public Iterable<Administrator> getAdministrators() {
        return administratorRepo.findAll();
    }

    public Optional<Administrator> getAdministratorById(Long id) {
        return administratorRepo.findById(id);
    }
    
    public Optional<Administrator> getAdministratorByUsername(String username) {
        return administratorRepo.getByUsername(username);
    }

    public void addAdministrator(Administrator administrator) {
    	loginServ.addPermsion(administrator.getAccountData(), "ROLE_ADMINISTRATOR");
    	administrator.getAccountData().setPassword(passwordEncoder.encode(administrator.getAccountData().getPassword()));
        administratorRepo.save(administrator);
    }
    
    public void removeAdministrator(Long id) {
        Optional<Administrator> administrator = administratorRepo.findById(id);
        Administrator a = administrator.get();
        a.setDeleted(true);
        administratorRepo.delete(administrator.get());
    }

    public void updateAdministrator(String username, Administrator administrator) {
        Optional<Administrator> Adm = administratorRepo.getByUsername(username);
        if(Adm.isPresent()) {
            administrator.setId(Adm.get().getId());
            administrator.getAccountData().setPassword(passwordEncoder.encode(administrator.getAccountData().getPassword()));
            accountServ.updateAccountData(administrator.getAccountData().getId(), administrator.getAccountData());        
        }
    }

}
