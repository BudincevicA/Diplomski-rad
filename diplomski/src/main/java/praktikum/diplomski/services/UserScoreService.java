package praktikum.diplomski.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.UserScore;
import praktikum.diplomski.repositories.UserScoreRepository;

@Service
public class UserScoreService {

    @Autowired
    private UserScoreRepository userScoreRepo;


    public UserScoreService() {
    }

    public Iterable<UserScore> getUserScores() {
        return userScoreRepo.findAll();
    }

    public Optional<UserScore> getUserScoreById(Long id) {
        return userScoreRepo.findById(id);
    }

    public void addUserScore(UserScore userScore) {
    	userScoreRepo.save(userScore);
    }

    public void removeUserScore(Long id) {
        Optional<UserScore> userScore = userScoreRepo.findById(id);
        userScoreRepo.delete(userScore.get());
    }

    public void updateUserScore(Long id, UserScore userScore) {
        Optional<UserScore> Rev = userScoreRepo.findById(id);
        if(Rev.isPresent()) {
        	userScore.setId(Rev.get().getId());
        	userScoreRepo.save(userScore);
        }
    }
	
	
}
