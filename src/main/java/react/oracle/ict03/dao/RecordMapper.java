package react.oracle.ict03.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import react.oracle.ict03.dto.RecordDTO;

@Mapper		// DAOImpl 작성하지 않아도 mapper 호출가능
public interface RecordMapper {
	
	// 상품목록
	public List<RecordDTO> recordList();
	
	// 상품등록
	public int insertRecord(RecordDTO dto);
	
	// 상품수정
	public int updateRecord(RecordDTO dto);
	
	// 상품삭제
	public int deleteRecord (String name);
	
	// 상품상세
	public RecordDTO selectRecord(String name);
}
