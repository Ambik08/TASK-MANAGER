package com.taskmanager.Task.Repository;


import com.taskmanager.Task.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
