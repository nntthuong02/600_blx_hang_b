# Ôn thi GPLX hạng B — 600 câu

Web app (PWA) ôn luyện lý thuyết thi giấy phép lái xe hạng B, bộ 600 câu hỏi.

## Nguồn dữ liệu (crawl)

- **600 câu hỏi & 60 câu điểm liệt:** https://taplaixe.vn/bo-600-cau-hoi-ly-thuyet-thi-gplx

> Hệ đánh số câu trong app (`q.id`, 1–600) khớp với số câu trên taplaixe.vn
> (đã đối chiếu câu 1).

## Tiêu chí đậu

- Đúng **≥ 27/30 câu**, **VÀ**
- **Không sai (không bỏ trống)** câu nào trong **60 câu điểm liệt**.

Sai 1 câu điểm liệt → rớt ngay, dù đủ điểm.

### 60 câu điểm liệt (theo q.id)

```
19,20,21,22,23,24,25,26,27,28,
30,32,34,35,47,48,52,53,55,58,
63,64,65,66,67,68,70,71,72,73,
74,85,86,87,88,89,90,91,92,93,
97,98,102,117,163,165,167,197,198,206,
226,234,245,246,251,252,253,254,255,260
```

Định nghĩa trong `index.html` tại biến `CRITICAL_IDS`.
