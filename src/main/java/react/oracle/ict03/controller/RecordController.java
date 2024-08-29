package react.oracle.ict03.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import react.oracle.ict03.dto.RecordDTO;
import react.oracle.ict03.service.RecordServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/record")
public class RecordController {
   
   @Autowired
   private RecordServiceImpl service; 
   
   private static final Logger logger = LoggerFactory.getLogger(RecordController.class);
   
   // http://localhost:8081/record
   // List
   @GetMapping
   public List<RecordDTO> recordList(HttpServletRequest req, HttpServletResponse res, Model model) 
      throws ServletException, IOException {
      
      logger.info("<<< url - recordList");
      return service.listAll();
   }
   
   // Insert
   @PostMapping
   public Map<String, Object> recordInsert(@RequestBody RecordDTO dto) 
         throws ServletException, IOException {
      
      logger.info("<<< url - recordInsert >>>");
      
      String resultCode ="";
      String resultMsg = "";
      
      Map<String, Object> map = new HashMap<String, Object>();
      
      try {
         int insertCnt = service.insertRecord(dto);
         if(insertCnt == 1) {
            resultCode = "200";
            resultMsg = "recordInsert Success!!";
         }
      } catch(Exception e) {
         resultCode = "400";
         resultMsg = e.getMessage();
         e.printStackTrace();
      }
      
      map.put("resultCode", resultCode);
      map.put("resultMsg", resultMsg);
      
      System.out.println("[ recordInsert 성공 ~~ ]");
      return map;
      
   }
   
   // 1건 select(수정을 위한 상세페이지)
   @GetMapping("/{name}")
   public RecordDTO fetchRecordByID(@PathVariable String name) 
         throws ServletException, IOException {
      
      logger.info("<<< url - fetchRecordByID >>>");
      System.out.println("name : " + name);
      
      return service.findById(name);
   }
   
   // update
   @PutMapping("/{name}") // @RequestBody 누락시 부적합한 열유형 에러
   public Map<String, Object> recordUpdate(@PathVariable String name, @RequestBody RecordDTO dto) 
         throws ServletException, IOException {
      
      logger.info("<<< url - recordUpdate >>>");
      
      String resultCode ="";
      String resultMsg = "";
      
      Map<String, Object> map = new HashMap<String, Object>();
      
      try {
         dto.setName(name);
         int updateCnt = service.updateRecord(dto);
         if(updateCnt == 1) {
            resultCode = "200";
            resultMsg = "recordUpdate Success!!";
         }
      } catch(Exception e) {
         resultCode = "400";
         resultMsg = e.getMessage();
         e.printStackTrace();
      }
      
      map.put("resultCode", resultCode);
      map.put("resultMsg", resultMsg);
      
      System.out.println("[ recordUpdate 성공 ~~ ]");
      return map;
   }
   
   // delete
   @DeleteMapping("/{name}") // @RequestBody 누락시 부적합한 열유형 에러
   public Map<String, Object> recordDelete(@PathVariable String name) 
         throws ServletException, IOException {
      
      logger.info("<<< url - recordDelete >>>");
      
      String resultCode ="";
      String resultMsg = "";
      
      Map<String, Object> map = new HashMap<String, Object>();
      
      try {
         int deleteCnt = service.deleteRecord(name);
         if(deleteCnt == 1) {
            resultCode = "200";
            resultMsg = "recordDelete Success!!";
         }
      } catch(Exception e) {
         resultCode = "400";
         resultMsg = e.getMessage();
         e.printStackTrace();
      }
      
      map.put("resultCode", resultCode);
      map.put("resultMsg", resultMsg);
      
      System.out.println("[ recordDelete 성공 ~~ ]");
      return map;
   }

}

