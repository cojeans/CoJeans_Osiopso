package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.request.feed.AdviceRequestDto;
import com.cojeans.osiopso.dto.request.feed.ArticlePhotoRequestDto;
import com.cojeans.osiopso.dto.response.comment.CommentLikeResponseDto;
import com.cojeans.osiopso.dto.response.feed.*;
import com.cojeans.osiopso.entity.feed.*;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.*;
import com.cojeans.osiopso.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class AdviceService {

    private final ArticleRepository articleRepository;
    private final AdviceRepository adviceRepository;
    private final ArticlePhotoRepository photoRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final ArticleLikeRepository articleLikeRepository;
    private final UserRepository userRepository;
    private final ArticlePhotoRepository articlePhotoRepository;


    public boolean createAdvice(AdviceRequestDto adviceRequestDto, List<MultipartFile> pictures, Long id) {
        User user = userRepository.findById(id).orElseThrow();


        // 게시물 저장
        Advice adviceSaved = adviceRepository.save(Advice.builder()
                .user(user)
                .hit(0)
                .content(adviceRequestDto.getContent())
                .subject(adviceRequestDto.getSubject())
                .isSelected(adviceRequestDto.isSelected())
                .build());


        // 사진 저장
        for (MultipartFile picture : pictures) {
            String path = System.getProperty("user.dir"); // 현재 디렉토리
            File file = new File(path + "/src/main/resources/static/" + picture.getOriginalFilename());

            if(!file.getParentFile().exists()) file.getParentFile().mkdir();
            try {
                picture.transferTo(file);
            } catch (Exception e) {
                e.printStackTrace();
            }

            articlePhotoRepository.save(ArticlePhoto.builder()
                    .storeFilename(file.getPath())
                    .originFilename(file.getName())
                    .article(adviceSaved)
                    .build());
        }

        return true;
    }

    public List<AdviceListResponseDto> listAdvice() {
        List<Advice> Advices = adviceRepository.findList();
        List<AdviceListResponseDto> list = new ArrayList<>();


        // 프론트와 필요한 리스트 데이터들 타협후에 완성할 예정
        for (Advice advice : Advices) {
            AdviceListResponseDto dto = AdviceListResponseDto.builder()
                    .build();
            list.add(dto);
        }

        for (AdviceListResponseDto response : list) {
            System.out.println(response.toString());
        }

        return list;
    }



    // 1. param 으로 훈수 찾아오기
    // 2. 훈수 게시물 Id로 articleTag 찾아오기
    // 3. articleTag iterator 돌려서 id로 keyword
    public AdviceDetailResponseDto detailAdvice(Long articleNo) {
        Advice advice = adviceRepository.findById(articleNo).orElseThrow();

        // 사진 가져오기
        List<ArticlePhoto> photoEntityList = photoRepository.findAllByArticle_Id(advice.getId());
        List<ArticlePhotoResponseDto> photoResponseDtoList = new ArrayList<>();

        for (ArticlePhoto ap : photoEntityList) {
            photoResponseDtoList.add(ArticlePhotoResponseDto.builder()
                    .originFilename(ap.getOriginFilename())
                    .storeFilename(ap.getStoreFilename())
                    .build());
        }

        // 게시물 좋아요 가져오기
        // DataFormat) x 유저가 좋아요를 눌렀다.
        List<ArticleLike> articleLikeList = articleLikeRepository.findAllByArticle_Id(articleNo);
        List<ArticleLikeResponseDto> articleLikeResponseDtoList = new ArrayList<>();

        for (ArticleLike al : articleLikeList) {
            articleLikeResponseDtoList.add(ArticleLikeResponseDto.builder()
                    .id(al.getId())
                    .userId(al.getUser().getId())
                    .build());
        }


        // 댓글 좋아요 가져오기
        // 하나의 게시물에 등록된 여러개의 댓글에 대해 좋아요를 가져와야 한다.
        // DataFormat) x 번 댓글에 y 유저가 좋아요를 눌렀다.

        List<CommentLike> commentLikeList = commentLikeRepository.findAllByArticle_Id(articleNo);
        List<CommentLikeResponseDto> commentLikeResponseDtoList = new ArrayList<>();

        for (CommentLike cl : commentLikeList) {
            commentLikeResponseDtoList.add(CommentLikeResponseDto.builder()
                    .id(cl.getId())
                    .userId(cl.getUser().getId())
                    .commentId(cl.getComment().getId())
                    .build());
        }


        return AdviceDetailResponseDto.builder()
                .id(advice.getId())
                .userId(advice.getUser().getId())
                .createTime(advice.getCreateTime())
                .modifyTime(advice.getModifyTime())
                .photos(photoResponseDtoList)
                .articleLikes(articleLikeResponseDtoList)
                .commentLikes(commentLikeResponseDtoList)
                .hit(advice.getHit())
                .content(advice.getContent())
                .isSelected(advice.isSelected())
                .subject(advice.getSubject())
                .build();
    }


    public boolean editAdvice(Long articleNo, AdviceRequestDto adviceRequestDto, Long userId) {
        Advice advice = adviceRepository.findById(articleNo).orElseThrow();

        // 게시글 작성자만 수정권한이 있다.
        if (userId != advice.getUser().getId()) {
            return false;
        }

        // ========================= 사진수정 로직 ================================
        // 기존 사진 : 1, 2, 3 => 1, 2, 3, 4
        // 새로운 사진 : 2, 3, 4
        // 1. 새로운 사진을 돌리면서 기존사진에 없다면 추가한다.
        // 2. 기존 사진을 돌리면서 추가할 새로운 태그에 없다면 삭제한다.
        // 나중에 사진 업로드 완성되면 할 예정

        if (articleRepository.save(Advice.builder()
                .id(articleNo)
                .subject(adviceRequestDto.getSubject())
                .isSelected(adviceRequestDto.isSelected())
                .content(adviceRequestDto.getContent())
                .build()) == null) {
            return false;
        } else {
            return true;
        }
    }
}