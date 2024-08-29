package react.oracle.ict03.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import react.oracle.ict03.dao.RecordMapper;
import react.oracle.ict03.dto.RecordDTO;

@Service
public class RecordServiceImpl implements RecordService{
	
	@Autowired
	private RecordMapper dao;
	
	@Override
	public List<RecordDTO> listAll() throws ServletException, IOException {
		System.out.println("서비스 - listAll()");
		
		List<RecordDTO> list = dao.recordList();
		System.out.println("list : " + list);
		return list;
	}

	@Override
	public int insertRecord(RecordDTO dto) throws ServletException, IOException {
		System.out.println("서비스 - insertRecord()");
		
		int insertCnt = dao.insertRecord(dto);
		System.out.println("insertCnt : " + insertCnt);
		
		return insertCnt;
	}

	@Override
    public int updateRecord(RecordDTO dto) 
         throws ServletException, IOException {
		System.out.println("서비스 - updateRecord()");
      
		int updateCnt = dao.updateRecord(dto);
		return updateCnt;
    }

   @Override
   public int deleteRecord(String name) 
         throws ServletException, IOException {
	   System.out.println("서비스 - deleteRecord()");
	   int deleteCnt = dao.deleteRecord(name);
	   return deleteCnt;
   }

	@Override
	public RecordDTO findById(String name) throws ServletException, IOException {
		System.out.println("서비스 - findById()");
		
		RecordDTO dto = dao.selectRecord(name);
		System.out.println("dto : " + dto);
		
		return dto;
	}

}
