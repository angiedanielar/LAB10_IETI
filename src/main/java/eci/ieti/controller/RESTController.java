package eci.ieti.controller;


import eci.ieti.data.model.Todo;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.List;

@RequestMapping("api")
@RestController
public class RESTController {
	
	@Autowired
    private GridFsTemplate gridFsTemplate;
	
    @Autowired
    private TodoRepository todoRepository;

   //TODO inject components (TodoRepository and GridFsTemplate)

    @RequestMapping("/files/{filename}")
    public ResponseEntity<InputStreamResource> getFileByName(@PathVariable String filename) throws IOException {
    	try {
            GridFSFile file = gridFsTemplate.findOne(new Query().addCriteria(Criteria.where("filename").is(filename)));
            GridFsResource resource = gridFsTemplate.getResource(file.getFilename());
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf(resource.getContentType()))
                    .body(new InputStreamResource(resource.getInputStream()));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin("*")
    @PostMapping("/files")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) throws IOException {
    	gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());
        return "http://localhost:8080/api/files/"+file.getOriginalFilename();
    }

    @CrossOrigin("*")
    @PostMapping("/todo")
    public Todo createTodo(@RequestBody Todo todo) {
    	todoRepository.save(todo);
        return todo;
    }

    @CrossOrigin("*")
    @GetMapping("/todo")
    public List<Todo> getTodoList() {
    	return todoRepository.findAll();
    }

}
