package praktikum.diplomski.repositories;


import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import praktikum.diplomski.models.UserScore;

@Repository
public interface UserScoreRepository  extends JpaRepository<UserScore, Long>{
	ArrayList<UserScore> findUserScoresByFilmId(Long filmId);
}
