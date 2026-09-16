import type { Dictionary } from './en'

/**
 * Vietnamese copy. Must mirror the structure of `en.ts` exactly (type-checked).
 */
const vi: Dictionary = {
  meta: {
    title: 'HQT Group | Nhập khẩu · Xuất khẩu · Logistics chuỗi lạnh',
    description:
      'HQT Group nhập khẩu thủy hải sản, thịt và gia cầm đông lạnh từ Ấn Độ, Nga và các thị trường đối tác, xuất khẩu hàng Việt Nam và cung cấp logistics chuỗi lạnh toàn quốc.',
  },
  common: {
    tagline: 'Nhập khẩu · Xuất khẩu · Logistics chuỗi lạnh',
    skipToContent: 'Chuyển đến nội dung chính',
    openMenu: 'Mở menu',
    closeMenu: 'Đóng menu',
    language: 'Ngôn ngữ',
    navPrimary: 'Điều hướng chính',
    navFooter: 'Chân trang',
  },
  nav: {
    about: 'Giới thiệu',
    services: 'Dịch vụ',
    products: 'Sản phẩm',
    markets: 'Thị trường',
    whyUs: 'Vì sao chọn HQT',
    process: 'Quy trình',
    contact: 'Liên hệ',
    cta: 'Nhận báo giá',
  },
  hero: {
    eyebrow: 'Đối tác nhập khẩu · xuất khẩu · chuỗi lạnh tại Việt\u00A0Nam',
    title: 'Hàng đông lạnh giao tận nơi, chuỗi lạnh không gián đoạn.',
    subtitle:
      'HQT Group tìm nguồn thủy hải sản, thịt và gia cầm đông lạnh từ các nhà cung cấp quốc tế uy tín và phân phối đến các nhà phân phối trên khắp Việt Nam - đúng quy định, kiểm soát nhiệt độ nghiêm ngặt và đúng tiến độ.',
    ctaPrimary: 'Liên hệ ngay',
    ctaSecondary: 'Dịch vụ của chúng tôi',
    visualLabel: 'Hình minh họa chuỗi cung ứng kiểm soát nhiệt độ từ nơi xuất xứ đến điểm đến',
    illustration: {
      frozen: 'ĐÔNG LẠNH',
      inTransit: 'ĐANG VẬN CHUYỂN',
      hub: 'TRUNG TÂM HQT',
    },
    stats: [
      { label: 'Nguồn hàng đa quốc gia', detail: 'Ấn Độ, Nga và các thị trường đối tác khác' },
      { label: 'Kiểm soát nhiệt độ xuyên suốt', detail: 'Từ kho lạnh tại nguồn đến kho của bạn' },
      { label: 'Lo trọn thủ tục hải quan & chứng từ', detail: 'Giấy phép nhập khẩu, kiểm dịch và thông quan' },
      { label: 'Quy mô đơn hàng linh hoạt', detail: 'Nguyên container hoặc chia lô cho nhà phân phối' },
    ],
  },
  about: {
    eyebrow: 'Về HQT Group',
    title: 'Đối tác thương mại khu vực, xây dựng trên sự tin cậy',
    intro:
      'HQT Group là công ty xuất nhập khẩu có trụ sở tại Việt Nam, chuyên về thực phẩm đông lạnh và dịch vụ logistics chuỗi lạnh đảm bảo an toàn cho sản phẩm. Chúng tôi kết nối các nhà sản xuất quốc tế với nhà phân phối, đại lý bán sỉ trong nước, đồng thời đưa hàng Việt Nam đến các đối tác trong khu vực.',
    missionTitle: 'Sứ mệnh',
    mission:
      'Giúp hoạt động thương mại thực phẩm đông lạnh xuyên biên giới trở nên đơn giản, minh bạch và đáng tin cậy cho mọi đối tác trong chuỗi - từ nhà sản xuất, nhà phân phối đến người tiêu dùng cuối.',
    valuesTitle: 'Giá trị cốt lõi',
    values: [
      {
        title: 'Tin cậy',
        text: 'Chất lượng ổn định, chứng từ chính xác và lịch giao hàng để đối tác chủ động lên kế hoạch.',
      },
      {
        title: 'Tuân thủ',
        text: 'Tuân thủ nghiêm ngặt tiêu chuẩn an toàn thực phẩm, yêu cầu thú y, kiểm dịch và quy định hải quan.',
      },
      {
        title: 'Đồng hành',
        text: 'Quan hệ lâu dài với nhà cung cấp và nhà phân phối, dựa trên giá cả minh bạch và trao đổi cởi mở.',
      },
    ],
  },
  services: {
    eyebrow: 'Dịch vụ',
    title: 'Ba năng lực, một chuỗi cung ứng tích hợp',
    intro:
      'Dù bạn cần một lô hàng nhập khẩu đơn lẻ hay một chương trình chuỗi lạnh được quản lý trọn gói và lâu dài, HQT Group đều đảm nhận mọi công đoạn.',
    items: [
      {
        title: 'Nhập khẩu',
        text: 'Tìm nguồn và nhập khẩu thủy hải sản, thịt, gia cầm và các thực phẩm đông lạnh liên quan từ những nhà cung cấp quốc tế đạt chuẩn.',
        bullets: [
          'Thẩm định nhà cung cấp và truy xuất nguồn gốc',
          'Giấy phép nhập khẩu, hồ sơ thú y và kiểm dịch',
          'Thông quan và tối ưu thuế nhập khẩu',
          'Nguyên container hoặc gom hàng chia lô',
        ],
      },
      {
        title: 'Xuất khẩu',
        text: 'Đưa nông sản và thực phẩm Việt Nam đến các đối tác trong khu vực với bộ chứng từ xuất khẩu đầy đủ.',
        bullets: [
          'Kết nối thị trường và người mua trong khu vực',
          'Chứng nhận xuất xứ, kiểm dịch động thực vật, an toàn thực phẩm',
          'Đóng gói, ghi nhãn xuất khẩu và đặt chỗ container',
          'Tư vấn điều kiện thanh toán và Incoterms',
        ],
      },
      {
        title: 'Logistics chuỗi lạnh',
        text: 'Kho bãi, bốc xếp và phân phối có kiểm soát nhiệt độ, giữ sản phẩm đúng tiêu chuẩn ở mọi điểm chuyển giao.',
        bullets: [
          'Kho đông và kho mát với nhiệt độ được kiểm soát',
          'Giám sát nhiệt độ và hồ sơ bốc xếp đầy đủ',
          'Vận chuyển xe lạnh đến kho nhà phân phối toàn quốc',
          'Theo dõi tồn kho và xuất hàng theo lịch',
        ],
      },
    ],
  },
  products: {
    eyebrow: 'Sản phẩm',
    title: 'Các mặt hàng đông lạnh được nhà phân phối tin dùng',
    intro:
      'Chúng tôi tập trung vào những nhóm hàng đông lạnh có vòng quay nhanh, nơi chất lượng ổn định và chuỗi lạnh liên tục là yếu tố quyết định.',
    items: [
      {
        title: 'Thủy hải sản đông lạnh',
        text: 'Cá, tôm, mực và các loại hải sản khác, nguyên con hoặc đã sơ chế, từ các nhà máy chế biến được chứng nhận.',
      },
      {
        title: 'Thịt & gia cầm đông lạnh',
        text: 'Thịt bò, thịt heo, thịt gà và phụ phẩm với quy cách cắt và đóng gói phù hợp kênh bán sỉ.',
      },
      {
        title: 'Thực phẩm đông lạnh khác',
        text: 'Rau củ, trái cây đông lạnh và thực phẩm bán thành phẩm bổ sung cho danh mục của nhà phân phối.',
      },
      {
        title: 'Tìm nguồn theo yêu cầu',
        text: 'Cho chúng tôi biết sản phẩm, quy cách và sản lượng - chúng tôi sẽ tìm nguồn từ mạng lưới nhà cung cấp và gửi báo giá.',
      },
    ],
    complianceTitle: 'An toàn thực phẩm và truy xuất nguồn gốc',
    compliance:
      'Chúng tôi hợp tác với các nhà cung cấp vận hành theo hệ thống an toàn thực phẩm dựa trên HACCP và duy trì hồ sơ truy xuất nguồn gốc cho từng lô hàng, giúp bạn tự tin đáp ứng yêu cầu tuân thủ của mình và của khách hàng.',
    complianceBadges: ['Nhà cung cấp theo chuẩn HACCP', 'Truy xuất nguồn gốc', 'Tuân thủ thú y & kiểm dịch'],
  },
  markets: {
    eyebrow: 'Thị trường & nguồn hàng',
    title: 'Từ những nguồn hàng uy tín đến Việt\u00A0Nam và khu vực',
    intro:
      'Mạng lưới nguồn hàng đa quốc gia giúp nhà phân phối duy trì nguồn cung ổn định và có nhiều lựa chọn cạnh tranh qua các mùa vụ.',
    originsTitle: 'Nguồn hàng',
    origins: [
      { name: 'Ấn Độ', text: 'Thủy hải sản, thịt trâu và thực phẩm đông lạnh chế biến' },
      { name: 'Nga', text: 'Cá nước lạnh, hải sản và gia cầm' },
      { name: 'Các thị trường đối tác khác', text: 'Nhà cung cấp đạt chuẩn tại châu Á, châu Âu và châu Mỹ' },
    ],
    destinationsTitle: 'Điểm đến',
    destinations: [
      { name: 'Việt Nam - nhà phân phối trong nước', text: 'Đại lý bán sỉ, nhà phân phối và nhà cung cấp cho ngành dịch vụ ăn uống trên toàn quốc' },
      { name: 'Đối tác xuất khẩu trong khu vực', text: 'Nhà nhập khẩu và nhà phân phối tại các thị trường lân cận' },
    ],
    diagramLabel: 'Sơ đồ dòng hàng từ các nguồn cung qua kho lạnh HQT Group đến các điểm đến',
    hub: 'Trung tâm chuỗi lạnh HQT Group',
    hubNote: '-18 °C · kiểm soát nhiệt độ',
  },
  whyUs: {
    eyebrow: 'Vì sao chọn HQT',
    title: 'Điều làm nên sự khác biệt của chuỗi cung ứng HQT',
    items: [
      {
        title: 'Chuỗi lạnh không gián đoạn',
        text: 'Lưu kho, bốc xếp và vận chuyển có kiểm soát nhiệt độ từ nguồn đến kho của bạn, kèm hồ sơ chứng minh đầy đủ.',
      },
      {
        title: 'Tuân thủ là ưu tiên hàng đầu',
        text: 'Giấy phép nhập khẩu, kiểm tra thú y, kiểm dịch và thủ tục hải quan được xử lý chính xác ngay từ lần đầu.',
      },
      {
        title: 'Mạng lưới nguồn hàng vững mạnh',
        text: 'Nhà cung cấp đạt chuẩn tại Ấn Độ, Nga và các thị trường đối tác khác mang đến nguồn cung ổn định và nhiều lựa chọn.',
      },
      {
        title: 'Quy mô đơn hàng linh hoạt',
        text: 'Nguyên container cho khách hàng sản lượng lớn, chia lô cho nhà phân phối đang thử mặt hàng mới - chúng tôi đồng hành theo quy mô của bạn.',
      },
      {
        title: 'Giá cả minh bạch',
        text: 'Báo giá rõ ràng với chi tiết chi phí về đến kho, không phát sinh bất ngờ tại cảng hay trên hóa đơn.',
      },
      {
        title: 'Đồng hành tận tâm',
        text: 'Một đầu mối liên hệ hiểu rõ hoạt động của bạn, phản hồi nhanh và theo sát từng lô hàng đến cuối.',
      },
    ],
  },
  process: {
    eyebrow: 'Cách chúng tôi làm việc',
    title: 'Từ yêu cầu đến giao hàng qua năm bước rõ ràng',
    steps: [
      {
        title: 'Tiếp nhận yêu cầu',
        text: 'Bạn chia sẻ sản phẩm, quy cách, sản lượng và thời gian giao hàng mong muốn.',
      },
      {
        title: 'Báo giá & tìm nguồn',
        text: 'Chúng tôi kết nối yêu cầu với nhà cung cấp đạt chuẩn và gửi báo giá minh bạch theo chi phí về đến kho.',
      },
      {
        title: 'Vận chuyển & hải quan',
        text: 'Đặt container lạnh, chứng từ xuất khẩu, giấy phép nhập khẩu và thông quan.',
      },
      {
        title: 'Lưu kho lạnh',
        text: 'Hàng được nhập kho kiểm soát nhiệt độ, kiểm tra và ghi nhận tồn kho đầy đủ.',
      },
      {
        title: 'Giao hàng',
        text: 'Giao bằng xe lạnh theo lịch đến kho của bạn, nguyên lô hoặc chia lô theo thỏa thuận.',
      },
    ],
  },
  contact: {
    eyebrow: 'Liên hệ',
    title: 'Hãy để chúng tôi báo giá lô hàng tiếp theo của bạn',
    intro:
      'Cho chúng tôi biết nhu cầu của bạn, chúng tôi sẽ phản hồi với các phương án nguồn hàng và báo giá minh bạch. Chúng tôi làm việc bằng tiếng Việt và tiếng Anh.',
    detailsTitle: 'Thông tin liên hệ',
    email: 'Email',
    phone: 'Điện thoại',
    address: 'Địa chỉ',
    hours: 'Giờ làm việc',
    messaging: 'Nhắn tin cho chúng tôi',
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    form: {
      title: 'Gửi yêu cầu',
      name: 'Họ và tên',
      company: 'Công ty',
      email: 'Địa chỉ email',
      phone: 'Số điện thoại (không bắt buộc)',
      interest: 'Tôi quan tâm đến',
      interests: {
        import: 'Nhập khẩu hàng đông lạnh',
        export: 'Xuất khẩu từ Việt Nam',
        logistics: 'Logistics chuỗi lạnh',
        other: 'Nhu cầu khác',
      },
      message: 'Nội dung',
      messagePlaceholder: 'Sản phẩm, quy cách, sản lượng, điểm giao và thời gian mong muốn...',
      required: 'Bắt buộc',
      submit: 'Mở trong ứng dụng email',
      note: 'Khi gửi, ứng dụng email của bạn sẽ mở với nội dung đã được điền sẵn - không có gì được gửi đi cho đến khi bạn nhấn gửi. Bạn muốn dùng kênh khác? Hãy email hoặc nhắn tin trực tiếp theo thông tin liên hệ trong mục này.',
      success: 'Ứng dụng email của bạn đã được mở với nội dung điền sẵn. Nếu không có gì xảy ra, vui lòng gửi email trực tiếp đến',
      errors: {
        name: 'Vui lòng nhập họ và tên.',
        email: 'Vui lòng nhập địa chỉ email hợp lệ.',
        message: 'Vui lòng mô tả ngắn gọn nhu cầu của bạn.',
      },
      subjectPrefix: 'Yêu cầu từ',
    },
  },
  footer: {
    navTitle: 'Điều hướng',
    contactTitle: 'Liên hệ',
    rights: 'Bảo lưu mọi quyền.',
    backToTop: 'Lên đầu trang',
  },
}

export default vi
