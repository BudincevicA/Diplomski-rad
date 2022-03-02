package praktikum.diplomski.repositories;

import java.util.Set;

import praktikum.diplomski.models.AccountDataPermission;

public interface AccountDataPermissionRepository {
	Set<AccountDataPermission> getByAccountDataId(Long id);
}
