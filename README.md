### 📦 `User`

* **id**: String (PK)
* name: String
* email: String `@unique`
* password: String
* user\_type: UserType (enum)
* createdAt: DateTime
* updatedAt: DateTime
* deletedAt: DateTime?

**Relations:**

* 1 → 1: Doctor (`UserDoctor`)
* 1 → 1: Staff (`UserStaff`)
* 1 → \*: Token (`UserTokens`)
* 1 → \*: Doctor (`CreatedDoctors`) as creator
* 1 → \*: Staff (`CreatedStaff`) as creator

---

### 📦 `Doctor`

* **id**: String (PK)
* phone: String
* specialty: String
* created\_by: String?
* status: Status (enum)
* createdAt: DateTime
* updatedAt: DateTime
* deletedAt: DateTime?

**Relations:**

* 1 → 1: User (`UserDoctor`)
* * → 1: User (as creator, `CreatedDoctors`)
* 1 → \*: MedicalRecord (`DoctorMedicalRecords`)

---

### 📦 `Staff`

* **id**: String (PK)
* phone: String?
* role: StaffRole (enum)
* created\_by: String?
* status: Status (enum)
* createdAt: DateTime
* updatedAt: DateTime
* deletedAt: DateTime?

**Relations:**

* 1 → 1: User (`UserStaff`)
* * → 1: User (as creator, `CreatedStaff`)

---

### 📦 `Token`

* **id**: String (PK)
* user\_id: String?
* refresh\_token: String
* expires\_at: DateTime

**Relations:**

* * → 1: User (`UserTokens`)

---

### 📦 `Patient`

* **id**: String (PK)
* name: String
* birth\_date: DateTime?
* gender: Gender (enum)
* created\_at: DateTime
* updated\_at: DateTime
* deleted\_at: DateTime?

**Relations:**

* 1 → \*: MedicalRecord (`PatientMedicalRecords`)

---

### 📦 `MedicalRecord`

* **id**: String (PK)
* patient\_id: String
* created\_by: String
* createdAt: DateTime
* updatedAt: DateTime

**Relations:**

* * → 1: Doctor (`DoctorMedicalRecords`)
* * → 1: Patient (`PatientMedicalRecords`)
* 1 → \*: ConsultationSession (`MedicalRecordConsultations`)

---

### 📦 `ConsultationSession`

* **id**: String (PK)
* medicalRecordId: String
* antecedentsPersonnels: Json?
* antecedentsFamiliaux: Json?
* hdmSymptoms: Json?
* clinicalExam: Json?
* diagnosis: String?
* treatments: String?
* createdAt: DateTime

**Relations:**

* * → 1: MedicalRecord (`MedicalRecordConsultations`)
* 1 → \*: ComplementaryExam (`ConsultationComplementaryExams`)

---

### 📦 `ComplementaryExam`

* **id**: String (PK)
* consultationSessionId: String
* type: String
* exam: String
* result: Json?
* createdAt: DateTime

**Relations:**

* * → 1: ConsultationSession (`ConsultationComplementaryExams`)

---

### 🧮 Enums

* **UserType**: `doctor | staff | admin`
* **Status**: `pending | active | inactive`
* **StaffRole**: `nurse | receptionist`
* **Gender**: `male | female`
* **LogAction**: `CREATE | UPDATE | DELETE`
* **LogTargetTable**: `User | Doctor | Staff | Token | Patient`
* **LogTargetId**: `id | user_id | doctor_id | staff_id | token_id | patient_id`

---

Would you like a Mermaid diagram version for documentation or a visual render next?





# MedCab Backend

Admin Panel Features
Admin Authentication:

Login (email, password).
Token-based session management.
Admin Management:

Create, read, update, delete (CRUD) operations for admin accounts.
Doctor and Staff Management:

View and manage doctors and staff.
Assign roles and permissions.
Analytics and Logs:

View real-time system logs and usage analytics.

why web app
why database choice
tech stack choice
data modeling
data seeding

# urgency of patient condition

---

---

nom
prénom
ddn

# Antécédents

## Antécédents personnels

- médicaux
- chirurgicaux

## Antécédents familiaux

- père
- mère
- frère
- sœur

# Histoire de la maladie (HDM)

_symptômes_

- fièvre v/f
- douleurs
- altération de l’état général
- anorexie
- vomissements
- diarrhée
- vertiges

---

---

# Examen clinique

- tension artérielle
- glycémie capillaire
- œdème des membres inférieurs v/f
- bouffissure du visage v/f
- poids
- Labstix : +/-
  - pH
  - glucose
  - sang
  - protéines
  - cétones
- examen cardiovasculaire (saisie)
- examen pleuropulmonaire (saisie)
- examen uronéphrologique (saisie)
  - contact lombaire +/-
  - brûlure mictionnelle +/-
  - hématurie macroscopique +/-
- examen neurologique
  - céphalées +/-
  - vertiges
  - vomissements

---

---

# Examens complémentaires

## Sang

- numération formule sanguine (NFS)
- urée / créatininémie
- Na+ / K+ (rapport)
- Ca++ / phosphore
- cholestérol / triglycérides
- PTH (parathormone)
- glycémie à jeun + hémoglobine glyquée
- TGO / TGP
- bilirubine totale / directe / indirecte
- sérologie hépatite (B / C / VIH) / syphilis
- T3 / T4 / TSH
- protidémie
- albuminémie
- autres

## Urines

- chimie des urines
- examen cytobactériologique des urines (ECBU)
- protéinurie des 24h
- autres

---

---

# Diagnostic

(saisie)

# Traitements

## Traitements médicaux

(saisie)

## Traitements supplémentaires

- dialyse péritonéale +/-
- hémodialyse +/-
- transplantation rénale +/-

---

---
