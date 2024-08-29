package react.oracle.ict03.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import react.oracle.ict03.dto.RecordDTO;

public interface RecordService {

	// 상품목록
	public List<RecordDTO> listAll()
		throws ServletException, IOException;
	
	// 상품등록
	public int insertRecord(RecordDTO dto)
			throws ServletException, IOException;
	
	// 상품수정
	public int updateRecord(RecordDTO dto)
			throws ServletException, IOException;
	
	// 상품삭제
	public int deleteRecord(String name) 
			throws ServletException, IOException;
	
	// 상품상세
	public RecordDTO findById (String name)
			throws ServletException, IOException;
	
}
