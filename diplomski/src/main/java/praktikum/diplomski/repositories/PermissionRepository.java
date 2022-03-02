package praktikum.diplomski.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import praktikum.diplomski.models.Permission;

public interface PermissionRepository extends JpaRepository <Permission, Long> {

	Optional<Permission> getByTitle(String string);
	
}
