export const programmingQuestions = [
  {
    "id": "prog-01",
    "title": "Reverse a String",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Write a function that reverses an input string without using built-in string reverse methods.",
    "examples": [
      {
        "input": "s = 'hello'",
        "output": "'olleh'"
      },
      {
        "input": "s = 'LearningX'",
        "output": "'XgninraeL'"
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable ASCII characters."
    ],
    "starterCode": {
      "python": "def reverse_string(s: str) -> str:\n    # Write your solution here\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "hello"
        ],
        "expected": "olleh"
      },
      {
        "input": [
          "LearningX"
        ],
        "expected": "XgninraeL"
      },
      {
        "input": [
          "a"
        ],
        "expected": "a"
      },
      {
        "input": [
          "racecar"
        ],
        "expected": "racecar"
      }
    ],
    "hints": [
      "Consider using two pointers from both ends or slicing in Python."
    ],
    "solution": {
      "python": "def reverse_string(s: str) -> str:\n    return s[::-1]",
      "explanation": "Slicing reverses the string in O(n) time and minimal space."
    }
  },
  {
    "id": "prog-02",
    "title": "Palindrome Check",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Given a string s, return true if it is a palindrome considering only alphanumeric characters and ignoring cases.",
    "examples": [
      {
        "input": "s = 'A man, a plan, a canal: Panama'",
        "output": "True"
      }
    ],
    "constraints": [
      "1 <= s.length <= 2 * 10^5"
    ],
    "starterCode": {
      "python": "def is_palindrome(s: str) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "A man, a plan, a canal: Panama"
        ],
        "expected": true
      },
      {
        "input": [
          "race a car"
        ],
        "expected": false
      },
      {
        "input": [
          " "
        ],
        "expected": true
      }
    ],
    "hints": [
      "Filter out non-alphanumeric characters and lowercase before comparing."
    ],
    "solution": {
      "python": "def is_palindrome(s: str) -> bool:\n    cleaned = [c.lower() for c in s if c.isalnum()]\n    return cleaned == cleaned[::-1]",
      "explanation": "Two pointers skipping non-alphanumeric characters solves in O(N) time and O(1) extra space."
    }
  },
  {
    "id": "prog-03",
    "title": "Factorial Calculation",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "Calculate the factorial of a non-negative integer n. Factorial of 0 is defined as 1.",
    "examples": [
      {
        "input": "n = 5",
        "output": "120"
      }
    ],
    "constraints": [
      "0 <= n <= 20"
    ],
    "starterCode": {
      "python": "def factorial(n: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          0
        ],
        "expected": 1
      },
      {
        "input": [
          5
        ],
        "expected": 120
      },
      {
        "input": [
          10
        ],
        "expected": 3628800
      }
    ],
    "hints": [
      "Use an iterative loop or recursion with base condition n <= 1."
    ],
    "solution": {
      "python": "def factorial(n: int) -> int:\n    res = 1\n    for i in range(2, n + 1):\n        res *= i\n    return res",
      "explanation": "Iterating from 2 to n produces the product in O(n) operations."
    }
  },
  {
    "id": "prog-04",
    "title": "Fibonacci Number",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "Compute the n-th Fibonacci number where F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.",
    "examples": [
      {
        "input": "n = 4",
        "output": "3"
      }
    ],
    "constraints": [
      "0 <= n <= 30"
    ],
    "starterCode": {
      "python": "def fib(n: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          0
        ],
        "expected": 0
      },
      {
        "input": [
          1
        ],
        "expected": 1
      },
      {
        "input": [
          4
        ],
        "expected": 3
      },
      {
        "input": [
          10
        ],
        "expected": 55
      }
    ],
    "hints": [
      "Store the previous two variables to avoid exponential recursion."
    ],
    "solution": {
      "python": "def fib(n: int) -> int:\n    if n <= 1: return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b",
      "explanation": "Dynamic programming with two variables runs in O(n) time and O(1) space."
    }
  },
  {
    "id": "prog-05",
    "title": "Count Vowels and Consonants",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Given a string s, return a dictionary with the count of vowels and consonants. Ignore spaces, digits, and symbols.",
    "examples": [
      {
        "input": "s = 'Hello World'",
        "output": "{'vowels': 3, 'consonants': 7}"
      }
    ],
    "constraints": [
      "0 <= s.length <= 10^4"
    ],
    "starterCode": {
      "python": "def count_vowels_consonants(s: str) -> dict:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "Hello World"
        ],
        "expected": {
          "vowels": 3,
          "consonants": 7
        }
      },
      {
        "input": [
          "LearningX 2026!"
        ],
        "expected": {
          "vowels": 3,
          "consonants": 6
        }
      },
      {
        "input": [
          "aeiou"
        ],
        "expected": {
          "vowels": 5,
          "consonants": 0
        }
      }
    ],
    "hints": [
      "Convert char to lowercase and check if it's in 'aeiou'."
    ],
    "solution": {
      "python": "def count_vowels_consonants(s: str) -> dict:\n    vowels = set('aeiou')\n    v_count = c_count = 0\n    for ch in s.lower():\n        if ch.isalpha():\n            if ch in vowels:\n                v_count += 1\n            else:\n                c_count += 1\n    return {'vowels': v_count, 'consonants': c_count}",
      "explanation": "Iterate through characters, check isalpha() and match with vowels set."
    }
  },
  {
    "id": "prog-06",
    "title": "Prime Number Checker",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "Determine if a positive integer n is a prime number.",
    "examples": [
      {
        "input": "[1]",
        "output": "False"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def is_prime(n: int) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          1
        ],
        "expected": false
      },
      {
        "input": [
          2
        ],
        "expected": true
      },
      {
        "input": [
          17
        ],
        "expected": true
      },
      {
        "input": [
          25
        ],
        "expected": false
      },
      {
        "input": [
          97
        ],
        "expected": true
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def is_prime(n: int) -> bool:\n    \n    if n < 2: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0: return False\n    return True",
      "explanation": "Optimal Easy approach utilizing Math & Logic primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-07",
    "title": "Find Second Largest Element",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Return the second largest distinct integer in an array nums. Return -1 if no second largest exists.",
    "examples": [
      {
        "input": "[[12, 35, 1, 10, 34, 1]]",
        "output": "34"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def second_largest(nums: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            12,
            35,
            1,
            10,
            34,
            1
          ]
        ],
        "expected": 34
      },
      {
        "input": [
          [
            10,
            10,
            10
          ]
        ],
        "expected": -1
      },
      {
        "input": [
          [
            5,
            1
          ]
        ],
        "expected": 1
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def second_largest(nums: list) -> int:\n    \n    unique = sorted(list(set(nums)))\n    return unique[-2] if len(unique) >= 2 else -1",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-08",
    "title": "Anagram Checker",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Given two strings s and t, return true if t is an anagram of s.",
    "examples": [
      {
        "input": "['anagram', 'nagaram']",
        "output": "True"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def is_anagram(s: str, t: str) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "anagram",
          "nagaram"
        ],
        "expected": true
      },
      {
        "input": [
          "rat",
          "car"
        ],
        "expected": false
      },
      {
        "input": [
          "listen",
          "silent"
        ],
        "expected": true
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def is_anagram(s: str, t: str) -> bool:\n    \n    return sorted(s) == sorted(t)",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-09",
    "title": "GCD / Greatest Common Divisor",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "Find the greatest common divisor of two integers a and b using the Euclidean algorithm.",
    "examples": [
      {
        "input": "[48, 18]",
        "output": "6"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def gcd(a: int, b: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          48,
          18
        ],
        "expected": 6
      },
      {
        "input": [
          101,
          10
        ],
        "expected": 1
      },
      {
        "input": [
          54,
          24
        ],
        "expected": 6
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def gcd(a: int, b: int) -> int:\n    \n    while b:\n        a, b = b, a % b\n    return a",
      "explanation": "Optimal Easy approach utilizing Math & Logic primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-10",
    "title": "LCM / Least Common Multiple",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "Calculate the least common multiple of two integers a and b.",
    "examples": [
      {
        "input": "[4, 6]",
        "output": "12"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def lcm(a: int, b: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          4,
          6
        ],
        "expected": 12
      },
      {
        "input": [
          5,
          7
        ],
        "expected": 35
      },
      {
        "input": [
          15,
          20
        ],
        "expected": 60
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def lcm(a: int, b: int) -> int:\n    \n    import math\n    return abs(a * b) // math.gcd(a, b)",
      "explanation": "Optimal Easy approach utilizing Math & Logic primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-11",
    "title": "Count Frequency of Elements",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Hash Maps & Dicts",
    "description": "Given a list, return a dictionary mapping each element to its occurrence count.",
    "examples": [
      {
        "input": "[['a', 'b', 'b', 'c', 'c', 'c']]",
        "output": "{'a': 1, 'b': 2, 'c': 3}"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def count_frequencies(arr: list) -> dict:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            "a",
            "b",
            "b",
            "c",
            "c",
            "c"
          ]
        ],
        "expected": {
          "a": 1,
          "b": 2,
          "c": 3
        }
      },
      {
        "input": [
          [
            "apple",
            "banana",
            "apple"
          ]
        ],
        "expected": {
          "apple": 2,
          "banana": 1
        }
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def count_frequencies(arr: list) -> dict:\n    \n    freq = {}\n    for item in arr:\n        freq[item] = freq.get(item, 0) + 1\n    return freq",
      "explanation": "Optimal Easy approach utilizing Hash Maps & Dicts primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-12",
    "title": "Merge Two Sorted Arrays",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Merge two sorted lists arr1 and arr2 into a single sorted list in O(n + m) time.",
    "examples": [
      {
        "input": "[[1, 3, 5], [2, 4, 6]]",
        "output": "[1, 2, 3, 4, 5, 6]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def merge_sorted(arr1: list, arr2: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            3,
            5
          ],
          [
            2,
            4,
            6
          ]
        ],
        "expected": [
          1,
          2,
          3,
          4,
          5,
          6
        ]
      },
      {
        "input": [
          [
            1
          ],
          []
        ],
        "expected": [
          1
        ]
      },
      {
        "input": [
          [],
          [
            2
          ]
        ],
        "expected": [
          2
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def merge_sorted(arr1: list, arr2: list) -> list:\n    \n    i = j = 0\n    res = []\n    while i < len(arr1) and j < len(arr2):\n        if arr1[i] <= arr2[j]:\n            res.append(arr1[i]); i += 1\n        else:\n            res.append(arr2[j]); j += 1\n    res.extend(arr1[i:])\n    res.extend(arr2[j:])\n    return res",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-13",
    "title": "Remove Duplicates from List",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Return a list with all duplicate values removed while preserving original order.",
    "examples": [
      {
        "input": "[[1, 2, 2, 3, 4, 4, 1]]",
        "output": "[1, 2, 3, 4]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def remove_duplicates(arr: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            2,
            3,
            4,
            4,
            1
          ]
        ],
        "expected": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "input": [
          [
            "a",
            "b",
            "a"
          ]
        ],
        "expected": [
          "a",
          "b"
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def remove_duplicates(arr: list) -> list:\n    \n    seen = set()\n    res = []\n    for x in arr:\n        if x not in seen:\n            seen.add(x)\n            res.append(x)\n    return res",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-14",
    "title": "Title Case a Sentence",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Convert the first character of each word in a string to uppercase, keeping other characters lowercase.",
    "examples": [
      {
        "input": "['the quick brown fox']",
        "output": "The Quick Brown Fox"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def title_case(s: str) -> str:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "the quick brown fox"
        ],
        "expected": "The Quick Brown Fox"
      },
      {
        "input": [
          "hello WORLD"
        ],
        "expected": "Hello World"
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def title_case(s: str) -> str:\n    \n    return ' '.join(word.capitalize() for word in s.split())",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-15",
    "title": "Sum of Digits",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "Calculate the sum of digits of an integer n until the result is a single digit (Digital Root).",
    "examples": [
      {
        "input": "[38]",
        "output": "2"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def digital_root(n: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          38
        ],
        "expected": 2
      },
      {
        "input": [
          0
        ],
        "expected": 0
      },
      {
        "input": [
          9999
        ],
        "expected": 9
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def digital_root(n: int) -> int:\n    \n    if n == 0: return 0\n    return 1 + (n - 1) % 9",
      "explanation": "Optimal Easy approach utilizing Math & Logic primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-16",
    "title": "FizzBuzz Sequence",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "Generate FizzBuzz list up to integer n.",
    "examples": [
      {
        "input": "[5]",
        "output": "['1', '2', 'Fizz', '4', 'Buzz']"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def fizz_buzz(n: int) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          5
        ],
        "expected": [
          "1",
          "2",
          "Fizz",
          "4",
          "Buzz"
        ]
      },
      {
        "input": [
          3
        ],
        "expected": [
          "1",
          "2",
          "Fizz"
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def fizz_buzz(n: int) -> list:\n    \n    res = []\n    for i in range(1, n + 1):\n        if i % 15 == 0: res.append('FizzBuzz')\n        elif i % 3 == 0: res.append('Fizz')\n        elif i % 5 == 0: res.append('Buzz')\n        else: res.append(str(i))\n    return res",
      "explanation": "Optimal Easy approach utilizing Math & Logic primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-17",
    "title": "Find Missing Number in 1 to N",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Given an array containing n distinct numbers taken from 0 to n, return the one missing from the array.",
    "examples": [
      {
        "input": "[[3, 0, 1]]",
        "output": "2"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def missing_number(nums: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            3,
            0,
            1
          ]
        ],
        "expected": 2
      },
      {
        "input": [
          [
            0,
            1
          ]
        ],
        "expected": 2
      },
      {
        "input": [
          [
            9,
            6,
            4,
            2,
            3,
            5,
            7,
            0,
            1
          ]
        ],
        "expected": 8
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def missing_number(nums: list) -> int:\n    \n    n = len(nums)\n    return n * (n + 1) // 2 - sum(nums)",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-18",
    "title": "Check Armstrong Number",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "Return true if the sum of its own digits each raised to the power of the number of digits equals the number.",
    "examples": [
      {
        "input": "[153]",
        "output": "True"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def is_armstrong(n: int) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          153
        ],
        "expected": true
      },
      {
        "input": [
          370
        ],
        "expected": true
      },
      {
        "input": [
          123
        ],
        "expected": false
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def is_armstrong(n: int) -> bool:\n    \n    s = str(n)\n    p = len(s)\n    return sum(int(c)**p for c in s) == n",
      "explanation": "Optimal Easy approach utilizing Math & Logic primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-19",
    "title": "Rotate Array by K Steps",
    "track": "python",
    "difficulty": "Medium",
    "topic": "Arrays",
    "description": "Rotate an array to the right by k steps, where k is non-negative.",
    "examples": [
      {
        "input": "[[1, 2, 3, 4, 5, 6, 7], 3]",
        "output": "[5, 6, 7, 1, 2, 3, 4]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def rotate_array(nums: list, k: int) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ],
          3
        ],
        "expected": [
          5,
          6,
          7,
          1,
          2,
          3,
          4
        ]
      },
      {
        "input": [
          [
            -1,
            -100,
            3,
            99
          ],
          2
        ],
        "expected": [
          3,
          99,
          -1,
          -100
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def rotate_array(nums: list, k: int) -> list:\n    \n    k = k % len(nums)\n    return nums[-k:] + nums[:-k] if k else nums",
      "explanation": "Optimal Medium approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-20",
    "title": "Valid Parentheses",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Determine if an input string composed only of '()[]{}' has valid nesting and closing.",
    "examples": [
      {
        "input": "['()[]{}']",
        "output": "True"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def is_valid_parentheses(s: str) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "()[]{}"
        ],
        "expected": true
      },
      {
        "input": [
          "(]"
        ],
        "expected": false
      },
      {
        "input": [
          "([{}])"
        ],
        "expected": true
      },
      {
        "input": [
          "["
        ],
        "expected": false
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def is_valid_parentheses(s: str) -> bool:\n    \n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for ch in s:\n        if ch in mapping:\n            if not stack or stack.pop() != mapping[ch]: return False\n        else: stack.append(ch)\n    return len(stack) == 0",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-21",
    "title": "String Compression",
    "track": "python",
    "difficulty": "Medium",
    "topic": "Strings",
    "description": "Compress a string by replacing consecutive repeating characters with char and count (e.g. 'aabcccccaaa' -> 'a2b1c5a3'). Return original if compressed is not shorter.",
    "examples": [
      {
        "input": "['aabcccccaaa']",
        "output": "a2b1c5a3"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def compress_string(s: str) -> str:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "aabcccccaaa"
        ],
        "expected": "a2b1c5a3"
      },
      {
        "input": [
          "abcdef"
        ],
        "expected": "abcdef"
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def compress_string(s: str) -> str:\n    \n    if not s: return s\n    res = []\n    count = 1\n    for i in range(1, len(s)):\n        if s[i] == s[i-1]: count += 1\n        else:\n            res.append(s[i-1] + str(count))\n            count = 1\n    res.append(s[-1] + str(count))\n    compressed = ''.join(res)\n    return compressed if len(compressed) < len(s) else s",
      "explanation": "Optimal Medium approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-22",
    "title": "Power of Two",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Bit Manipulation",
    "description": "Given an integer n, return true if it is a power of two without loops.",
    "examples": [
      {
        "input": "[1]",
        "output": "True"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def is_power_of_two(n: int) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          1
        ],
        "expected": true
      },
      {
        "input": [
          16
        ],
        "expected": true
      },
      {
        "input": [
          3
        ],
        "expected": false
      },
      {
        "input": [
          0
        ],
        "expected": false
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def is_power_of_two(n: int) -> bool:\n    \n    return n > 0 and (n & (n - 1)) == 0",
      "explanation": "Optimal Easy approach utilizing Bit Manipulation primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-23",
    "title": "Hamming Weight (Number of 1 Bits)",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Bit Manipulation",
    "description": "Write a function that takes the binary representation of a positive integer and returns the number of set bits (1s).",
    "examples": [
      {
        "input": "[11]",
        "output": "3"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def hamming_weight(n: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          11
        ],
        "expected": 3
      },
      {
        "input": [
          128
        ],
        "expected": 1
      },
      {
        "input": [
          2147483645
        ],
        "expected": 30
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def hamming_weight(n: int) -> int:\n    \n    count = 0\n    while n:\n        n &= (n - 1)\n        count += 1\n    return count",
      "explanation": "Optimal Easy approach utilizing Bit Manipulation primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-24",
    "title": "Single Number",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Bit Manipulation",
    "description": "Given a non-empty array of integers where every element appears twice except for one, find that single one in O(n) time and O(1) space.",
    "examples": [
      {
        "input": "[[2, 2, 1]]",
        "output": "1"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def single_number(nums: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            2,
            2,
            1
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            1,
            2,
            1,
            2
          ]
        ],
        "expected": 4
      },
      {
        "input": [
          [
            1
          ]
        ],
        "expected": 1
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def single_number(nums: list) -> int:\n    \n    res = 0\n    for x in nums: res ^= x\n    return res",
      "explanation": "Optimal Easy approach utilizing Bit Manipulation primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-25",
    "title": "Binary to Decimal Converter",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "Convert a binary string representation into its integer decimal value.",
    "examples": [
      {
        "input": "['1010']",
        "output": "10"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def binary_to_decimal(b: str) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "1010"
        ],
        "expected": 10
      },
      {
        "input": [
          "1111"
        ],
        "expected": 15
      },
      {
        "input": [
          "0"
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def binary_to_decimal(b: str) -> int:\n    \n    return int(b, 2)",
      "explanation": "Optimal Easy approach utilizing Math & Logic primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-26",
    "title": "Decimal to Binary Converter",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "Convert a non-negative integer into its binary string representation without '0b' prefix.",
    "examples": [
      {
        "input": "[10]",
        "output": "1010"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def decimal_to_binary(n: int) -> str:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          10
        ],
        "expected": "1010"
      },
      {
        "input": [
          15
        ],
        "expected": "1111"
      },
      {
        "input": [
          0
        ],
        "expected": "0"
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def decimal_to_binary(n: int) -> str:\n    \n    return bin(n)[2:]",
      "explanation": "Optimal Easy approach utilizing Math & Logic primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-27",
    "title": "Find Intersection of Two Arrays",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Given two integer arrays nums1 and nums2, return an array of their unique intersection.",
    "examples": [
      {
        "input": "[[1, 2, 2, 1], [2, 2]]",
        "output": "[2]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def intersection(nums1: list, nums2: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            2,
            1
          ],
          [
            2,
            2
          ]
        ],
        "expected": [
          2
        ]
      },
      {
        "input": [
          [
            4,
            9,
            5
          ],
          [
            9,
            4,
            9,
            8,
            4
          ]
        ],
        "expected": [
          4,
          9
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def intersection(nums1: list, nums2: list) -> list:\n    \n    return sorted(list(set(nums1) & set(nums2)))",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-28",
    "title": "Roman to Integer",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Convert a Roman numeral string (I, V, X, L, C, D, M) to an integer.",
    "examples": [
      {
        "input": "['III']",
        "output": "3"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def roman_to_int(s: str) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "III"
        ],
        "expected": 3
      },
      {
        "input": [
          "LVIII"
        ],
        "expected": 58
      },
      {
        "input": [
          "MCMXCIV"
        ],
        "expected": 1994
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def roman_to_int(s: str) -> int:\n    \n    vals = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}\n    total = 0\n    for i in range(len(s)):\n        if i + 1 < len(s) and vals[s[i]] < vals[s[i+1]]:\n            total -= vals[s[i]]\n        else:\n            total += vals[s[i]]\n    return total",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-29",
    "title": "Integer to Roman",
    "track": "python",
    "difficulty": "Medium",
    "topic": "Strings",
    "description": "Convert an integer (1 <= num <= 3999) into its Roman numeral string representation.",
    "examples": [
      {
        "input": "[3]",
        "output": "III"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def int_to_roman(num: int) -> str:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          3
        ],
        "expected": "III"
      },
      {
        "input": [
          58
        ],
        "expected": "LVIII"
      },
      {
        "input": [
          1994
        ],
        "expected": "MCMXCIV"
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def int_to_roman(num: int) -> str:\n    \n    mapping = [(1000, 'M'), (900, 'CM'), (500, 'D'), (400, 'CD'), (100, 'C'), (90, 'XC'), (50, 'L'), (40, 'XL'), (10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I')]\n    res = []\n    for val, sym in mapping:\n        while num >= val:\n            res.append(sym)\n            num -= val\n    return ''.join(res)",
      "explanation": "Optimal Medium approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-30",
    "title": "Capitalize Every Alternate Word",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Given a string of words, capitalize every alternate word (starting with the 1st word capitalized, 2nd lowercase, etc.).",
    "examples": [
      {
        "input": "['hello world from python coding']",
        "output": "Hello world From python Coding"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def alternate_capitalize(s: str) -> str:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "hello world from python coding"
        ],
        "expected": "Hello world From python Coding"
      },
      {
        "input": [
          "ONE two THREE four"
        ],
        "expected": "One two Three four"
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def alternate_capitalize(s: str) -> str:\n    \n    words = s.split()\n    res = [w.capitalize() if i % 2 == 0 else w.lower() for i, w in enumerate(words)]\n    return ' '.join(res)",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-31",
    "title": "Pascal's Triangle Row",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Given an integer rowIndex (0-indexed), return the rowIndex-th row of Pascal's triangle.",
    "examples": [
      {
        "input": "[3]",
        "output": "[1, 3, 3, 1]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def get_pascal_row(rowIndex: int) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          3
        ],
        "expected": [
          1,
          3,
          3,
          1
        ]
      },
      {
        "input": [
          0
        ],
        "expected": [
          1
        ]
      },
      {
        "input": [
          1
        ],
        "expected": [
          1,
          1
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def get_pascal_row(rowIndex: int) -> list:\n    \n    row = [1]\n    for _ in range(rowIndex):\n        row = [x + y for x, y in zip([0] + row, row + [0])]\n    return row",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-32",
    "title": "Check Leap Year",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "Given a year, return True if it is a leap year according to Gregorian calendar rules.",
    "examples": [
      {
        "input": "[2000]",
        "output": "True"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def is_leap_year(year: int) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          2000
        ],
        "expected": true
      },
      {
        "input": [
          1900
        ],
        "expected": false
      },
      {
        "input": [
          2024
        ],
        "expected": true
      },
      {
        "input": [
          2023
        ],
        "expected": false
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def is_leap_year(year: int) -> bool:\n    \n    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)",
      "explanation": "Optimal Easy approach utilizing Math & Logic primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-33",
    "title": "Find Longest Word in Sentence",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Return the longest word in a given sentence. If there are ties, return the first one.",
    "examples": [
      {
        "input": "['The quick brown fox jumped over the lazy dog']",
        "output": "jumped"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def longest_word(s: str) -> str:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "The quick brown fox jumped over the lazy dog"
        ],
        "expected": "jumped"
      },
      {
        "input": [
          "Python is amazing"
        ],
        "expected": "amazing"
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def longest_word(s: str) -> str:\n    \n    words = s.split()\n    return max(words, key=len) if words else ''",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-34",
    "title": "Matrix Transpose",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Given a 2D matrix, return its transpose (swapping row and column indices).",
    "examples": [
      {
        "input": "[[[1, 2, 3], [4, 5, 6]]]",
        "output": "[[1, 4], [2, 5], [3, 6]]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def transpose(matrix: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            [
              1,
              2,
              3
            ],
            [
              4,
              5,
              6
            ]
          ]
        ],
        "expected": [
          [
            1,
            4
          ],
          [
            2,
            5
          ],
          [
            3,
            6
          ]
        ]
      },
      {
        "input": [
          [
            [
              1
            ],
            [
              2
            ],
            [
              3
            ]
          ]
        ],
        "expected": [
          [
            1,
            2,
            3
          ]
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def transpose(matrix: list) -> list:\n    \n    return [list(row) for row in zip(*matrix)]",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-35",
    "title": "Flatten Nested List",
    "track": "python",
    "difficulty": "Medium",
    "topic": "Arrays",
    "description": "Flatten an arbitrarily nested list of integers into a single flat list.",
    "examples": [
      {
        "input": "[[[1, [2]], [3, [4, [5]]]]]",
        "output": "[1, 2, 3, 4, 5]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def flatten_list(nested: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            [
              1,
              [
                2
              ]
            ],
            [
              3,
              [
                4,
                [
                  5
                ]
              ]
            ]
          ]
        ],
        "expected": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": [
          1,
          2,
          3
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def flatten_list(nested: list) -> list:\n    \n    res = []\n    def helper(items):\n        for item in items:\n            if isinstance(item, list):\n                helper(item)\n            else:\n                res.append(item)\n    helper(nested)\n    return res",
      "explanation": "Optimal Medium approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-36",
    "title": "Perfect Number Check",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "A perfect number equals the sum of its positive proper divisors (excluding itself). Return true if n is perfect.",
    "examples": [
      {
        "input": "[28]",
        "output": "True"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def is_perfect_number(n: int) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          28
        ],
        "expected": true
      },
      {
        "input": [
          6
        ],
        "expected": true
      },
      {
        "input": [
          496
        ],
        "expected": true
      },
      {
        "input": [
          12
        ],
        "expected": false
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def is_perfect_number(n: int) -> bool:\n    \n    if n <= 1: return False\n    s = 1\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            s += i\n            if i*i != n: s += n // i\n    return s == n",
      "explanation": "Optimal Easy approach utilizing Math & Logic primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-37",
    "title": "Group Anagrams",
    "track": "python",
    "difficulty": "Medium",
    "topic": "Hash Maps & Dicts",
    "description": "Given an array of strings, group the anagrams together in any order.",
    "examples": [
      {
        "input": "[['eat', 'tea', 'tan', 'ate', 'nat', 'bat']]",
        "output": "[['ate', 'eat', 'tea'], ['bat'], ['nat', 'tan']]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def group_anagrams(strs: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            "eat",
            "tea",
            "tan",
            "ate",
            "nat",
            "bat"
          ]
        ],
        "expected": [
          [
            "ate",
            "eat",
            "tea"
          ],
          [
            "bat"
          ],
          [
            "nat",
            "tan"
          ]
        ]
      },
      {
        "input": [
          [
            "",
            ""
          ]
        ],
        "expected": [
          [
            "",
            ""
          ]
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def group_anagrams(strs: list) -> list:\n    \n    from collections import defaultdict\n    groups = defaultdict(list)\n    for s in strs:\n        groups[''.join(sorted(s))].append(s)\n    return sorted([sorted(g) for g in groups.values()])",
      "explanation": "Optimal Medium approach utilizing Hash Maps & Dicts primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-38",
    "title": "Count Occurrences of a Substring",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Count non-overlapping occurrences of sub in a given string s.",
    "examples": [
      {
        "input": "['banana', 'an']",
        "output": "2"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def count_substring(s: str, sub: str) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "banana",
          "an"
        ],
        "expected": 2
      },
      {
        "input": [
          "aaaaa",
          "aa"
        ],
        "expected": 2
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def count_substring(s: str, sub: str) -> int:\n    \n    return s.count(sub)",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-39",
    "title": "Find Common Elements in 3 Sorted Arrays",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Given three sorted integer arrays, return a sorted array of elements that appear in all three.",
    "examples": [
      {
        "input": "[[1, 5, 10, 20, 40, 80], [6, 7, 20, 80, 100], [3, 4, 15, 20, 30, 70, 80, 120]]",
        "output": "[20, 80]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def common_three(a: list, b: list, c: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            5,
            10,
            20,
            40,
            80
          ],
          [
            6,
            7,
            20,
            80,
            100
          ],
          [
            3,
            4,
            15,
            20,
            30,
            70,
            80,
            120
          ]
        ],
        "expected": [
          20,
          80
        ]
      },
      {
        "input": [
          [
            1,
            2
          ],
          [
            2,
            3
          ],
          [
            0,
            2
          ]
        ],
        "expected": [
          2
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def common_three(a: list, b: list, c: list) -> list:\n    \n    return sorted(list(set(a) & set(b) & set(c)))",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-40",
    "title": "First Unique Character in a String",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Find the index of the first non-repeating character in a string. Return -1 if none exists.",
    "examples": [
      {
        "input": "['leetcode']",
        "output": "0"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def first_unique_char(s: str) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "leetcode"
        ],
        "expected": 0
      },
      {
        "input": [
          "loveleetcode"
        ],
        "expected": 2
      },
      {
        "input": [
          "aabb"
        ],
        "expected": -1
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def first_unique_char(s: str) -> int:\n    \n    from collections import Counter\n    counts = Counter(s)\n    for i, ch in enumerate(s):\n        if counts[ch] == 1: return i\n    return -1",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-41",
    "title": "Check Subsequence",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Given two strings s and t, return true if s is a subsequence of t.",
    "examples": [
      {
        "input": "['abc', 'ahbgdc']",
        "output": "True"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def is_subsequence(s: str, t: str) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "abc",
          "ahbgdc"
        ],
        "expected": true
      },
      {
        "input": [
          "axc",
          "ahbgdc"
        ],
        "expected": false
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def is_subsequence(s: str, t: str) -> bool:\n    \n    it = iter(t)\n    return all(c in it for c in s)",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-42",
    "title": "Matrix Diagonal Sum",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Given a square matrix, return the sum of the matrix diagonals (primary and secondary, counting center element once).",
    "examples": [
      {
        "input": "[[[1, 2, 3], [4, 5, 6], [7, 8, 9]]]",
        "output": "25"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def diagonal_sum(mat: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            [
              1,
              2,
              3
            ],
            [
              4,
              5,
              6
            ],
            [
              7,
              8,
              9
            ]
          ]
        ],
        "expected": 25
      },
      {
        "input": [
          [
            [
              1,
              1,
              1,
              1
            ],
            [
              1,
              1,
              1,
              1
            ],
            [
              1,
              1,
              1,
              1
            ],
            [
              1,
              1,
              1,
              1
            ]
          ]
        ],
        "expected": 8
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def diagonal_sum(mat: list) -> int:\n    \n    n = len(mat)\n    total = 0\n    for i in range(n):\n        total += mat[i][i]\n        if i != n - 1 - i:\n            total += mat[i][n - 1 - i]\n    return total",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-43",
    "title": "Sieve of Eratosthenes",
    "track": "python",
    "difficulty": "Medium",
    "topic": "Math & Logic",
    "description": "Return a list of all prime numbers less than or equal to n.",
    "examples": [
      {
        "input": "[10]",
        "output": "[2, 3, 5, 7]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def sieve_primes(n: int) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          10
        ],
        "expected": [
          2,
          3,
          5,
          7
        ]
      },
      {
        "input": [
          20
        ],
        "expected": [
          2,
          3,
          5,
          7,
          11,
          13,
          17,
          19
        ]
      },
      {
        "input": [
          2
        ],
        "expected": [
          2
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def sieve_primes(n: int) -> list:\n    \n    if n < 2: return []\n    is_prime = [True] * (n + 1)\n    is_prime[0] = is_prime[1] = False\n    for i in range(2, int(n**0.5) + 1):\n        if is_prime[i]:\n            for j in range(i*i, n + 1, i): is_prime[j] = False\n    return [i for i in range(2, n + 1) if is_prime[i]]",
      "explanation": "Optimal Medium approach utilizing Math & Logic primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-44",
    "title": "Length of Last Word",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Given a string s consisting of words and spaces, return the length of the last word in the string.",
    "examples": [
      {
        "input": "['Hello World']",
        "output": "5"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def length_of_last_word(s: str) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "Hello World"
        ],
        "expected": 5
      },
      {
        "input": [
          "   fly me   to   the moon  "
        ],
        "expected": 4
      },
      {
        "input": [
          "luffy is still joyboy"
        ],
        "expected": 6
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def length_of_last_word(s: str) -> int:\n    \n    words = s.strip().split()\n    return len(words[-1]) if words else 0",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-45",
    "title": "Plus One",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Given a large integer represented as an integer array of digits, increment the large integer by one and return the resulting array of digits.",
    "examples": [
      {
        "input": "[[1, 2, 3]]",
        "output": "[1, 2, 4]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def plus_one(digits: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": [
          1,
          2,
          4
        ]
      },
      {
        "input": [
          [
            4,
            3,
            2,
            1
          ]
        ],
        "expected": [
          4,
          3,
          2,
          2
        ]
      },
      {
        "input": [
          [
            9
          ]
        ],
        "expected": [
          1,
          0
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def plus_one(digits: list) -> list:\n    \n    for i in range(len(digits) - 1, -1, -1):\n        if digits[i] < 9:\n            digits[i] += 1\n            return digits\n        digits[i] = 0\n    return [1] + digits",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-46",
    "title": "Power Function (Pow(x, n))",
    "track": "python",
    "difficulty": "Medium",
    "topic": "Math & Logic",
    "description": "Implement pow(x, n), which calculates x raised to the power n (x^n) in O(log n) time.",
    "examples": [
      {
        "input": "[2.0, 10]",
        "output": "1024.0"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def my_pow(x: float, n: int) -> float:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          2,
          10
        ],
        "expected": 1024
      },
      {
        "input": [
          2.1,
          3
        ],
        "expected": 9.261
      },
      {
        "input": [
          2,
          -2
        ],
        "expected": 0.25
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def my_pow(x: float, n: int) -> float:\n    \n    return round(pow(x, n), 3)",
      "explanation": "Optimal Medium approach utilizing Math & Logic primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-47",
    "title": "Isomorphic Strings",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Given two strings s and t, determine if they are isomorphic (characters can be replaced to get t).",
    "examples": [
      {
        "input": "['egg', 'add']",
        "output": "True"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def is_isomorphic(s: str, t: str) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "egg",
          "add"
        ],
        "expected": true
      },
      {
        "input": [
          "foo",
          "bar"
        ],
        "expected": false
      },
      {
        "input": [
          "paper",
          "title"
        ],
        "expected": true
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def is_isomorphic(s: str, t: str) -> bool:\n    \n    return len(set(s)) == len(set(t)) == len(set(zip(s, t)))",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-48",
    "title": "Majority Element",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Given an array nums of size n, return the majority element that appears more than floor(n / 2) times (Boyer-Moore Voting).",
    "examples": [
      {
        "input": "[[3, 2, 3]]",
        "output": "3"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def majority_element(nums: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            3,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            2,
            2,
            1,
            1,
            1,
            2,
            2
          ]
        ],
        "expected": 2
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def majority_element(nums: list) -> int:\n    \n    cand = count = 0\n    for x in nums:\n        if count == 0: cand = x\n        count += (1 if x == cand else -1)\n    return cand",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-49",
    "title": "Move Zeroes",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.",
    "examples": [
      {
        "input": "[[0, 1, 0, 3, 12]]",
        "output": "[1, 3, 12, 0, 0]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def move_zeroes(nums: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            0,
            1,
            0,
            3,
            12
          ]
        ],
        "expected": [
          1,
          3,
          12,
          0,
          0
        ]
      },
      {
        "input": [
          [
            0
          ]
        ],
        "expected": [
          0
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def move_zeroes(nums: list) -> list:\n    \n    non_zeros = [x for x in nums if x != 0]\n    return non_zeros + [0] * (len(nums) - len(non_zeros))",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-50",
    "title": "Find the Difference",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "String t is generated by random shuffling string s and then adding one more letter at a random position. Return the added letter.",
    "examples": [
      {
        "input": "['abcd', 'abcde']",
        "output": "e"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def find_the_difference(s: str, t: str) -> str:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "abcd",
          "abcde"
        ],
        "expected": "e"
      },
      {
        "input": [
          "",
          "y"
        ],
        "expected": "y"
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def find_the_difference(s: str, t: str) -> str:\n    \n    from collections import Counter\n    return list((Counter(t) - Counter(s)).keys())[0]",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-51",
    "title": "Collatz Sequence Length",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "Given n, return the number of steps until n reaches 1 under Collatz rules (if even n/2, if odd 3n+1).",
    "examples": [
      {
        "input": "[6]",
        "output": "8"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def collatz_steps(n: int) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          6
        ],
        "expected": 8
      },
      {
        "input": [
          1
        ],
        "expected": 0
      },
      {
        "input": [
          13
        ],
        "expected": 9
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def collatz_steps(n: int) -> int:\n    \n    steps = 0\n    while n > 1:\n        n = n // 2 if n % 2 == 0 else 3 * n + 1\n        steps += 1\n    return steps",
      "explanation": "Optimal Easy approach utilizing Math & Logic primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-52",
    "title": "Max Consecutive Ones",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Given a binary array nums, return the maximum number of consecutive 1's in the array.",
    "examples": [
      {
        "input": "[[1, 1, 0, 1, 1, 1]]",
        "output": "3"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def find_max_consecutive_ones(nums: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            1,
            0,
            1,
            1,
            1
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            1,
            0,
            1,
            1,
            0,
            1
          ]
        ],
        "expected": 2
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def find_max_consecutive_ones(nums: list) -> int:\n    \n    max_c = cur_c = 0\n    for x in nums:\n        if x == 1:\n            cur_c += 1\n            max_c = max(max_c, cur_c)\n        else: cur_c = 0\n    return max_c",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-53",
    "title": "Reverse Words in a String",
    "track": "python",
    "difficulty": "Medium",
    "topic": "Strings",
    "description": "Given an input string s, reverse the order of the words with reduced single spacing.",
    "examples": [
      {
        "input": "['the sky is blue']",
        "output": "blue is sky the"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def reverse_words(s: str) -> str:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "the sky is blue"
        ],
        "expected": "blue is sky the"
      },
      {
        "input": [
          "  hello world  "
        ],
        "expected": "world hello"
      },
      {
        "input": [
          "a good   example"
        ],
        "expected": "example good a"
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def reverse_words(s: str) -> str:\n    \n    return ' '.join(s.split()[::-1])",
      "explanation": "Optimal Medium approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-54",
    "title": "Word Pattern",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Given a pattern and a string s, find if s follows the same bijection pattern.",
    "examples": [
      {
        "input": "['abba', 'dog cat cat dog']",
        "output": "True"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def word_pattern(pattern: str, s: str) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "abba",
          "dog cat cat dog"
        ],
        "expected": true
      },
      {
        "input": [
          "abba",
          "dog cat cat fish"
        ],
        "expected": false
      },
      {
        "input": [
          "aaaa",
          "dog cat cat dog"
        ],
        "expected": false
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def word_pattern(pattern: str, s: str) -> bool:\n    \n    words = s.split()\n    if len(pattern) != len(words): return False\n    return len(set(pattern)) == len(set(words)) == len(set(zip(pattern, words)))",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-55",
    "title": "Intersection of Two Arrays II",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Given two integer arrays nums1 and nums2, return an array of their intersection with frequencies.",
    "examples": [
      {
        "input": "[[1, 2, 2, 1], [2, 2]]",
        "output": "[2, 2]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def intersect(nums1: list, nums2: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            2,
            1
          ],
          [
            2,
            2
          ]
        ],
        "expected": [
          2,
          2
        ]
      },
      {
        "input": [
          [
            4,
            9,
            5
          ],
          [
            9,
            4,
            9,
            8,
            4
          ]
        ],
        "expected": [
          4,
          9
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def intersect(nums1: list, nums2: list) -> list:\n    \n    from collections import Counter\n    c1, c2 = Counter(nums1), Counter(nums2)\n    res = []\n    for k in sorted(c1.keys()):\n        res.extend([k] * min(c1[k], c2[k]))\n    return res",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-56",
    "title": "Missing Ranges",
    "track": "python",
    "difficulty": "Medium",
    "topic": "Arrays",
    "description": "Given a sorted integer array nums in range [lower, upper], return summary ranges of missing numbers.",
    "examples": [
      {
        "input": "[[0, 1, 3, 50, 75], 0, 99]",
        "output": "['2', '4->49', '51->74', '76->99']"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def find_missing_ranges(nums: list, lower: int, upper: int) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            0,
            1,
            3,
            50,
            75
          ],
          0,
          99
        ],
        "expected": [
          "2",
          "4->49",
          "51->74",
          "76->99"
        ]
      },
      {
        "input": [
          [],
          1,
          1
        ],
        "expected": [
          "1"
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def find_missing_ranges(nums: list, lower: int, upper: int) -> list:\n    \n    res = []\n    prev = lower - 1\n    for i in range(len(nums) + 1):\n        curr = nums[i] if i < len(nums) else upper + 1\n        if curr - prev >= 2:\n            if curr - prev == 2: res.append(str(prev + 1))\n            else: res.append(f'{prev + 1}->{curr - 1}')\n        prev = curr\n    return res",
      "explanation": "Optimal Medium approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-57",
    "title": "Valid Palindrome II (At Most 1 Deletion)",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Given a string s, return true if the s can be palindrome after deleting at most one character from it.",
    "examples": [
      {
        "input": "['aba']",
        "output": "True"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def valid_palindrome_ii(s: str) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "aba"
        ],
        "expected": true
      },
      {
        "input": [
          "abca"
        ],
        "expected": true
      },
      {
        "input": [
          "abc"
        ],
        "expected": false
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def valid_palindrome_ii(s: str) -> bool:\n    \n    l, r = 0, len(s) - 1\n    while l < r:\n        if s[l] != s[r]:\n            sub1 = s[l+1:r+1]\n            sub2 = s[l:r]\n            return sub1 == sub1[::-1] or sub2 == sub2[::-1]\n        l += 1; r -= 1\n    return True",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-58",
    "title": "Find Peak Element in Array",
    "track": "python",
    "difficulty": "Medium",
    "topic": "Arrays",
    "description": "A peak element is an element strictly greater than its neighbors. Return the index of any peak element.",
    "examples": [
      {
        "input": "[[1, 2, 3, 1]]",
        "output": "2"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def find_peak_element(nums: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            1
          ]
        ],
        "expected": 2
      },
      {
        "input": [
          [
            1,
            2,
            1,
            3,
            5,
            6,
            4
          ]
        ],
        "expected": 5
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def find_peak_element(nums: list) -> int:\n    \n    return nums.index(max(nums))",
      "explanation": "Optimal Medium approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-59",
    "title": "Squares of a Sorted Array",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "description": "Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order in O(n).",
    "examples": [
      {
        "input": "[[-4, -1, 0, 3, 10]]",
        "output": "[0, 1, 9, 16, 100]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def sorted_squares(nums: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            -4,
            -1,
            0,
            3,
            10
          ]
        ],
        "expected": [
          0,
          1,
          9,
          16,
          100
        ]
      },
      {
        "input": [
          [
            -7,
            -3,
            2,
            3,
            11
          ]
        ],
        "expected": [
          4,
          9,
          9,
          49,
          121
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def sorted_squares(nums: list) -> list:\n    \n    return sorted([x*x for x in nums])",
      "explanation": "Optimal Easy approach utilizing Two Pointers primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-60",
    "title": "Monotonic Array Check",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "An array is monotonic if it is either monotone increasing or monotone decreasing. Return true if nums is monotonic.",
    "examples": [
      {
        "input": "[[1, 2, 2, 3]]",
        "output": "True"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def is_monotonic(nums: list) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            2,
            3
          ]
        ],
        "expected": true
      },
      {
        "input": [
          [
            6,
            5,
            4,
            4
          ]
        ],
        "expected": true
      },
      {
        "input": [
          [
            1,
            3,
            2
          ]
        ],
        "expected": false
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def is_monotonic(nums: list) -> bool:\n    \n    inc = all(nums[i] <= nums[i+1] for i in range(len(nums)-1))\n    dec = all(nums[i] >= nums[i+1] for i in range(len(nums)-1))\n    return inc or dec",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-61",
    "title": "Check If String Is Pangram",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "A pangram is a sentence where every letter of the English alphabet appears at least once. Return true if sentence is a pangram.",
    "examples": [
      {
        "input": "['thequickbrownfoxjumpsoverthelazydog']",
        "output": "True"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def check_if_pangram(sentence: str) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "thequickbrownfoxjumpsoverthelazydog"
        ],
        "expected": true
      },
      {
        "input": [
          "learningx"
        ],
        "expected": false
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def check_if_pangram(sentence: str) -> bool:\n    \n    return len(set(sentence.lower()) & set('abcdefghijklmnopqrstuvwxyz')) == 26",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-62",
    "title": "Self Dividing Numbers",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "A self-dividing number is divisible by every digit it contains. Return all self-dividing numbers in range [left, right].",
    "examples": [
      {
        "input": "[1, 22]",
        "output": "[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def self_dividing_numbers(left: int, right: int) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          1,
          22
        ],
        "expected": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          11,
          12,
          15,
          22
        ]
      },
      {
        "input": [
          47,
          85
        ],
        "expected": [
          48,
          55,
          66,
          77
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def self_dividing_numbers(left: int, right: int) -> list:\n    \n    def check(n):\n        for d in str(n):\n            if d == '0' or n % int(d) != 0: return False\n        return True\n    return [x for x in range(left, right + 1) if check(x)]",
      "explanation": "Optimal Easy approach utilizing Math & Logic primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-63",
    "title": "Jewels and Stones",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "You're given strings jewels representing the types of stones that are jewels, and stones representing the stones you have. How many stones are also jewels?",
    "examples": [
      {
        "input": "['aA', 'aAAbbbb']",
        "output": "3"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def num_jewels_in_stones(jewels: str, stones: str) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "aA",
          "aAAbbbb"
        ],
        "expected": 3
      },
      {
        "input": [
          "z",
          "ZZ"
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def num_jewels_in_stones(jewels: str, stones: str) -> int:\n    \n    j_set = set(jewels)\n    return sum(s in j_set for s in stones)",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-64",
    "title": "Counting Bits up to N",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Bit Manipulation",
    "description": "Given an integer n, return an array ans of length n + 1 such that ans[i] is the number of 1's in binary representation of i.",
    "examples": [
      {
        "input": "[2]",
        "output": "[0, 1, 1]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def count_bits(n: int) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          2
        ],
        "expected": [
          0,
          1,
          1
        ]
      },
      {
        "input": [
          5
        ],
        "expected": [
          0,
          1,
          1,
          2,
          1,
          2
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def count_bits(n: int) -> list:\n    \n    ans = [0] * (n + 1)\n    for i in range(1, n + 1):\n        ans[i] = ans[i >> 1] + (i & 1)\n    return ans",
      "explanation": "Optimal Easy approach utilizing Bit Manipulation primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-65",
    "title": "Find All Numbers Disappeared in an Array",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in [1, n] that do not appear in nums.",
    "examples": [
      {
        "input": "[[4, 3, 2, 7, 8, 2, 3, 1]]",
        "output": "[5, 6]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def find_disappeared_numbers(nums: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            4,
            3,
            2,
            7,
            8,
            2,
            3,
            1
          ]
        ],
        "expected": [
          5,
          6
        ]
      },
      {
        "input": [
          [
            1,
            1
          ]
        ],
        "expected": [
          2
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def find_disappeared_numbers(nums: list) -> list:\n    \n    return sorted(list(set(range(1, len(nums) + 1)) - set(nums)))",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-66",
    "title": "Keyboard Row Words",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Given an array of strings words, return the words that can be typed using alphabet letters on only one row of American keyboard.",
    "examples": [
      {
        "input": "[['Hello', 'Alaska', 'Dad', 'Peace']]",
        "output": "['Alaska', 'Dad']"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def find_words(words: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            "Hello",
            "Alaska",
            "Dad",
            "Peace"
          ]
        ],
        "expected": [
          "Alaska",
          "Dad"
        ]
      },
      {
        "input": [
          [
            "omk"
          ]
        ],
        "expected": []
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def find_words(words: list) -> list:\n    \n    r1, r2, r3 = set('qwertyuiop'), set('asdfghjkl'), set('zxcvbnm')\n    res = []\n    for w in words:\n        s = set(w.lower())\n        if s <= r1 or s <= r2 or s <= r3: res.append(w)\n    return res",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-67",
    "title": "Can Place Flowers",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "You have a long flowerbed where some plots are planted (1) and some not (0). Flowers cannot be planted in adjacent plots. Return if n new flowers can be planted.",
    "examples": [
      {
        "input": "[[1, 0, 0, 0, 1], 1]",
        "output": "True"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def can_place_flowers(flowerbed: list, n: int) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            0,
            0,
            0,
            1
          ],
          1
        ],
        "expected": true
      },
      {
        "input": [
          [
            1,
            0,
            0,
            0,
            1
          ],
          2
        ],
        "expected": false
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def can_place_flowers(flowerbed: list, n: int) -> bool:\n    \n    count = 0\n    fb = [0] + flowerbed + [0]\n    for i in range(1, len(fb) - 1):\n        if fb[i-1] == fb[i] == fb[i+1] == 0:\n            fb[i] = 1\n            count += 1\n    return count >= n",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-68",
    "title": "Baseball Game Point Tracker",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Stack & Queue",
    "description": "Given a list of ops ('+','D','C',integer), record scores according to the rules and return the sum of all scores.",
    "examples": [
      {
        "input": "[['5', '2', 'C', 'D', '+']]",
        "output": "30"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def cal_points(operations: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            "5",
            "2",
            "C",
            "D",
            "+"
          ]
        ],
        "expected": 30
      },
      {
        "input": [
          [
            "5",
            "-2",
            "4",
            "C",
            "D",
            "9",
            "+",
            "+"
          ]
        ],
        "expected": 27
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def cal_points(operations: list) -> int:\n    \n    stack = []\n    for op in operations:\n        if op == '+': stack.append(stack[-1] + stack[-2])\n        elif op == 'D': stack.append(stack[-1] * 2)\n        elif op == 'C': stack.pop()\n        else: stack.append(int(op))\n    return sum(stack)",
      "explanation": "Optimal Easy approach utilizing Stack & Queue primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-69",
    "title": "Degree of an Array",
    "track": "python",
    "difficulty": "Medium",
    "topic": "Arrays",
    "description": "Given a non-empty array of non-negative integers nums, find the smallest possible length of a contiguous subarray that has the same degree as nums.",
    "examples": [
      {
        "input": "[[1, 2, 2, 3, 1]]",
        "output": "2"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def find_shortest_subarray(nums: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            2,
            3,
            1
          ]
        ],
        "expected": 2
      },
      {
        "input": [
          [
            1,
            2,
            2,
            3,
            1,
            4,
            2
          ]
        ],
        "expected": 6
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def find_shortest_subarray(nums: list) -> int:\n    \n    left, right, count = {}, {}, {}\n    for i, x in enumerate(nums):\n        if x not in left: left[x] = i\n        right[x] = i\n        count[x] = count.get(x, 0) + 1\n    degree = max(count.values())\n    return min(right[x] - left[x] + 1 for x in count if count[x] == degree)",
      "explanation": "Optimal Medium approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-70",
    "title": "Longest Continuous Increasing Subsequence",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Arrays",
    "description": "Given an unsorted array of integers nums, return the length of the longest continuous increasing subarray.",
    "examples": [
      {
        "input": "[[1, 3, 5, 4, 7]]",
        "output": "3"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def find_length_of_lcis(nums: list) -> int:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            3,
            5,
            4,
            7
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            2,
            2,
            2,
            2,
            2
          ]
        ],
        "expected": 1
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def find_length_of_lcis(nums: list) -> int:\n    \n    if not nums: return 0\n    max_l = cur_l = 1\n    for i in range(1, len(nums)):\n        if nums[i] > nums[i-1]:\n            cur_l += 1\n            max_l = max(max_l, cur_l)\n        else: cur_l = 1\n    return max_l",
      "explanation": "Optimal Easy approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-71",
    "title": "Goat Latin Translator",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Convert a sentence to Goat Latin: If begins with vowel add 'ma', else move first letter to end and add 'ma'. Then add 'a' * (word index).",
    "examples": [
      {
        "input": "['I speak Goat Latin']",
        "output": "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def to_goat_latin(sentence: str) -> str:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "I speak Goat Latin"
        ],
        "expected": "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"
      },
      {
        "input": [
          "The quick brown fox"
        ],
        "expected": "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa"
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def to_goat_latin(sentence: str) -> str:\n    \n    vowels = set('aeiouAEIOU')\n    words = sentence.split()\n    res = []\n    for i, w in enumerate(words, 1):\n        if w[0] in vowels: nw = w + 'ma'\n        else: nw = w[1:] + w[0] + 'ma'\n        res.append(nw + 'a' * i)\n    return ' '.join(res)",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-72",
    "title": "Transpose a String of Matrix Words",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Given two strings s1 and s2 of equal length, return their interleaved combination (e.g. s1='abc', s2='pqr' -> 'apbqcr').",
    "examples": [
      {
        "input": "['abc', 'pqr']",
        "output": "apbqcr"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def interleave_strings(s1: str, s2: str) -> str:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "abc",
          "pqr"
        ],
        "expected": "apbqcr"
      },
      {
        "input": [
          "ab",
          "cd"
        ],
        "expected": "acbd"
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def interleave_strings(s1: str, s2: str) -> str:\n    \n    return ''.join(a + b for a, b in zip(s1, s2))",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-73",
    "title": "Check Strong Password",
    "track": "python",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Return true if password has length >= 8, contains at least one uppercase, one lowercase, one digit, and one special character (!@#$%^&*).",
    "examples": [
      {
        "input": "['Admin@123']",
        "output": "True"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def is_strong_password(p: str) -> bool:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          "Admin@123"
        ],
        "expected": true
      },
      {
        "input": [
          "password"
        ],
        "expected": false
      },
      {
        "input": [
          "Pass1234"
        ],
        "expected": false
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def is_strong_password(p: str) -> bool:\n    \n    if len(p) < 8: return False\n    has_u = any(c.isupper() for c in p)\n    has_l = any(c.islower() for c in p)\n    has_d = any(c.isdigit() for c in p)\n    has_s = any(c in '!@#$%^&*' for c in p)\n    return has_u and has_l and has_d and has_s",
      "explanation": "Optimal Easy approach utilizing Strings primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-74",
    "title": "Find All Duplicates in Array",
    "track": "python",
    "difficulty": "Medium",
    "topic": "Arrays",
    "description": "Given an integer array nums of length n where all integers are in range [1, n] and appear once or twice, return all elements appearing twice.",
    "examples": [
      {
        "input": "[[4, 3, 2, 7, 8, 2, 3, 1]]",
        "output": "[2, 3]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def find_duplicates(nums: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            4,
            3,
            2,
            7,
            8,
            2,
            3,
            1
          ]
        ],
        "expected": [
          2,
          3
        ]
      },
      {
        "input": [
          [
            1,
            1,
            2
          ]
        ],
        "expected": [
          1
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def find_duplicates(nums: list) -> list:\n    \n    from collections import Counter\n    return sorted([k for k, v in Counter(nums).items() if v == 2])",
      "explanation": "Optimal Medium approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  },
  {
    "id": "prog-75",
    "title": "Product of Array Except Self",
    "track": "python",
    "difficulty": "Medium",
    "topic": "Arrays",
    "description": "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i] in O(n) without division.",
    "examples": [
      {
        "input": "[[1, 2, 3, 4]]",
        "output": "[24, 12, 8, 6]"
      }
    ],
    "constraints": [
      "Standard input constraints applied.",
      "Optimize for time and space complexity."
    ],
    "starterCode": {
      "python": "def product_except_self(nums: list) -> list:\n    pass\n"
    },
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expected": [
          24,
          12,
          8,
          6
        ]
      },
      {
        "input": [
          [
            -1,
            1,
            0,
            -3,
            3
          ]
        ],
        "expected": [
          0,
          0,
          9,
          0,
          0
        ]
      }
    ],
    "hints": [
      "Check edge cases like empty inputs, boundary values, and negative numbers."
    ],
    "solution": {
      "python": "def product_except_self(nums: list) -> list:\n    \n    n = len(nums)\n    res = [1] * n\n    prefix = 1\n    for i in range(n):\n        res[i] = prefix\n        prefix *= nums[i]\n    suffix = 1\n    for i in range(n - 1, -1, -1):\n        res[i] *= suffix\n        suffix *= nums[i]\n    return res",
      "explanation": "Optimal Medium approach utilizing Arrays primitives for clean O(N) or optimal time execution."
    }
  }
];
