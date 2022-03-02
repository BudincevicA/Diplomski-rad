package praktikum.diplomski.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.AccountData;
import praktikum.diplomski.models.ForumMessage;
import praktikum.diplomski.models.Review;
import praktikum.diplomski.repositories.AccountDataRepository;
import praktikum.diplomski.repositories.ForumMessageRepository;
import praktikum.diplomski.repositories.ReviewRepository;

@Service
public class AccountDataService {
	
    @Autowired
    private AccountDataRepository accountDataRepo;
    
    @Autowired
    private ReviewRepository reviewRepo;
    
    @Autowired
    private ForumMessageRepository forumMessageRepo;

    public AccountDataService() {
    }

    public Iterable<AccountData> getAccountData() {
        return accountDataRepo.findAll();
    }

    public Optional<AccountData> getAccountDataById(Long id) {
        return accountDataRepo.findById(id);
    }
    
    public Optional<AccountData> getAccountDataByUserName(String username) {
        return accountDataRepo.findByUsername(username);
    }

    public void addAccountData(AccountData accountData) {
        accountDataRepo.save(accountData);
    }

    public void removeAccountData(Long id) {
        Optional<AccountData> accountData = accountDataRepo.findById(id);
        accountDataRepo.delete(accountData.get());
    }

    public void updateAccountData(Long id, AccountData accountData) {
        Optional<AccountData> Acc = accountDataRepo.findById(id);
        if(Acc.isPresent()) {
            accountData.setId(Acc.get().getId());
            accountDataRepo.save(accountData);
        }
    }
    
    public ArrayList<Review> getAccountReviews(Long reviewId) {
    	return reviewRepo.findByAccountDataIdEquals(reviewId);
    }
    
    public ArrayList<ForumMessage> getForumMessages(Long accountDataId) {
    	return forumMessageRepo.findForumMessagesByAccountDataId(accountDataId);
    }

}
