interface EmailData {
  to: string;
  subject: string;
  html: string;
}

interface PetApplicationData {
  petName: string;
  petId: string;
  userName: string;
  userPhone: string;
  userEmail?: string;
  message?: string;
}

interface FoundPetData {
  userName: string;
  userPhone: string;
  userEmail?: string;
  location: string;
  petType: string;
  petAge?: string;
  description: string;
  additionalInfo?: string;
}

interface GuardianApplicationData {
  petName: string;
  petId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  address: string;
  experience?: string;
  message?: string;
}

class EmailService {
  private readonly targetEmail = "predannost-bsk@mail.ru";
  private readonly formspreeId = "xpwaqgke"; // Временный ID для тестирования

  async sendPetApplication(data: PetApplicationData): Promise<boolean> {
    const formData = {
      to: this.targetEmail,
      subject: `Заявка на питомца: ${data.petName}`,
      petName: data.petName,
      petId: data.petId,
      userName: data.userName,
      userPhone: data.userPhone,
      userEmail: data.userEmail || "",
      message: data.message || "",
      formType: "pet_application",
      date: new Date().toLocaleString("ru-RU"),
    };

    return this.sendToFormspree(formData);
  }

  async sendFoundPetReport(data: FoundPetData): Promise<boolean> {
    const formData = {
      to: this.targetEmail,
      subject: `Найден питомец: ${data.petType}`,
      userName: data.userName,
      userPhone: data.userPhone,
      userEmail: data.userEmail || "",
      location: data.location,
      petType: data.petType,
      petAge: data.petAge || "",
      description: data.description,
      additionalInfo: data.additionalInfo || "",
      formType: "found_pet",
      date: new Date().toLocaleString("ru-RU"),
    };

    return this.sendToFormspree(formData);
  }

  async sendGuardianApplication(
    data: GuardianApplicationData,
  ): Promise<boolean> {
    const formData = {
      to: this.targetEmail,
      subject: `Заявка на опекунство: ${data.petName}`,
      petName: data.petName,
      petId: data.petId,
      userName: data.userName,
      userPhone: data.userPhone,
      userEmail: data.userEmail,
      address: data.address,
      experience: data.experience || "",
      message: data.message || "",
      formType: "guardian_application",
      date: new Date().toLocaleString("ru-RU"),
    };

    return this.sendToFormspree(formData);
  }

  private async sendToFormspree(formData: any): Promise<boolean> {
    try {
      const response = await fetch(
        `https://formspree.io/f/${this.formspreeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        console.log("Email отправлен через Formspree");
        return true;
      } else {
        console.error("Ошибка Formspree:", response.statusText);
        return this.fallbackMailto(formData);
      }
    } catch (error) {
      console.error("Ошибка отправки через Formspree:", error);
      return this.fallbackMailto(formData);
    }
  }

  private fallbackMailto(formData: any): boolean {
    try {
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(this.formatEmailBody(formData));
      const mailtoUrl = `mailto:${this.targetEmail}?subject=${subject}&body=${body}`;

      window.open(mailtoUrl, "_blank");
      return true;
    } catch (error) {
      console.error("Ошибка fallback mailto:", error);
      return false;
    }
  }

  private formatEmailBody(formData: any): string {
    let body = `${formData.subject}\n\n`;

    if (formData.formType === "pet_application") {
      body += `Питомец: ${formData.petName} (ID: ${formData.petId})\n`;
      body += `Имя: ${formData.userName}\n`;
      body += `Телефон: ${formData.userPhone}\n`;
      if (formData.userEmail) body += `Email: ${formData.userEmail}\n`;
      if (formData.message) body += `Сообщение: ${formData.message}\n`;
    } else if (formData.formType === "found_pet") {
      body += `Имя: ${formData.userName}\n`;
      body += `Телефон: ${formData.userPhone}\n`;
      if (formData.userEmail) body += `Email: ${formData.userEmail}\n`;
      body += `Место: ${formData.location}\n`;
      body += `Тип: ${formData.petType}\n`;
      if (formData.petAge) body += `Возраст: ${formData.petAge}\n`;
      body += `Описание: ${formData.description}\n`;
      if (formData.additionalInfo)
        body += `Доп. инфо: ${formData.additionalInfo}\n`;
    } else if (formData.formType === "guardian_application") {
      body += `Питомец: ${formData.petName} (ID: ${formData.petId})\n`;
      body += `Имя: ${formData.userName}\n`;
      body += `Телефон: ${formData.userPhone}\n`;
      body += `Email: ${formData.userEmail}\n`;
      body += `Адрес: ${formData.address}\n`;
      if (formData.experience) body += `Опыт: ${formData.experience}\n`;
      if (formData.message) body += `Сообщение: ${formData.message}\n`;
    }

    body += `\nДата: ${formData.date}`;
    return body;
  }
}

export const emailService = new EmailService();
