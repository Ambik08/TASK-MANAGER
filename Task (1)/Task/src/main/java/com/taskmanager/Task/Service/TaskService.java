package com.taskmanager.Task.Service;

import com.taskmanager.Task.Entity.Task;
import com.taskmanager.Task.Repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;


    public Task createTask(Task task) {
        return taskRepository.save(task);
    }


    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }


    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }


    public Task updateTask(Long id, Task task) {

        Task existingTask = taskRepository.findById(id).orElse(null);

        if (existingTask != null) {
            existingTask.setTitle(task.getTitle());
            existingTask.setContent(task.getContent());
            existingTask.setDueDate(task.getDueDate());
            existingTask.setCompleted(task.isCompleted());

            return taskRepository.save(existingTask);
        }

        return null;
    }

    public String deleteTask(Long id) {

        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return "Task deleted successfully";
        }

        return "Task not found";
    }
}
