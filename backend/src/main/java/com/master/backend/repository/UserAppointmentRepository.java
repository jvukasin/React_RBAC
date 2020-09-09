package com.master.backend.repository;

import com.master.backend.model.UserAppointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAppointmentRepository extends JpaRepository<UserAppointment, Long> {

    UserAppointment findOneById(Long id);
}
